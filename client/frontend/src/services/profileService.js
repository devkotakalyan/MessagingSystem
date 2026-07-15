import { supabase } from "./supabase";

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function searchProfiles(query, excludeUserId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", excludeUserId)
    .ilike("full_name", `%${query}%`)
    .limit(20);
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadAvatar(userId, file) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/avatar-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return updateProfile(userId, { avatar_url: data.publicUrl });
}

export async function setOnlineStatus(userId, isOnline) {
  const { error } = await supabase
    .from("profiles")
    .update({ is_online: isOnline, last_seen: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}

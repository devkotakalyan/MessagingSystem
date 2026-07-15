import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";

export function formatMessageTime(dateString) {
  const date = new Date(dateString);
  return format(date, "h:mm a");
}

export function formatLastSeen(dateString) {
  if (!dateString) return "offline";
  const date = new Date(dateString);
  if (isToday(date)) return `today at ${format(date, "h:mm a")}`;
  if (isYesterday(date)) return `yesterday at ${format(date, "h:mm a")}`;
  return `${formatDistanceToNowStrict(date)} ago`;
}

export function formatConversationName(conversation, currentUserId) {
  if (conversation.is_group) return conversation.name || "Unnamed group";
  const other = conversation.conversation_participants?.find(
    (p) => p.user_id !== currentUserId
  );
  return other?.profiles?.full_name || "Unknown user";
}

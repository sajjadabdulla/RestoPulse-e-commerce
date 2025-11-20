export default function ChatButton({ openChat }) {
  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
    >
      Chat 💬
    </button>
  );
}

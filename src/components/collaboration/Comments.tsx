import React, { useState } from 'react';
import { useCollaborationStore } from '../../store/collaboration-store';
import { format } from 'date-fns';
import { useAuthStore } from '../../store/auth-store';

interface CommentsProps {
  taskId: string;
}

export function Comments({ taskId }: CommentsProps) {
  const { comments, addComment, editComment, deleteComment } =
    useCollaborationStore();
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const taskComments = comments.filter((comment) => comment.taskId === taskId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Extract mentions from comment (e.g., @username)
    const mentions = newComment.match(/@(\w+)/g)?.map((m) => m.slice(1)) || [];

    addComment(taskId, newComment, mentions);
    setNewComment('');
  };

  const handleEdit = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingId(commentId);
      setEditContent(comment.content);
    }
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    await editComment(commentId, editContent);
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-500">Comments</h3>

      {/* Comment List */}
      <div className="space-y-4">
        {taskComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-500">
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium text-white">
                    {comment.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {comment.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(comment.createdAt, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>

              {user?.uid === comment.userId && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(comment.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {editingId === comment.id ? (
              <div className="mt-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows={3}
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="rounded bg-indigo-500 px-2 py-1 text-sm text-white hover:bg-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">
                {comment.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment... Use @username to mention someone"
          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}

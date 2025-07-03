import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { apiEndpoints } from '../config/api';
import { MoreVertical, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';

interface BlogActionsMenuProps {
  blogId: string;
  onDelete?: () => void;
  showReadOption?: boolean;
  className?: string;
}

export const BlogActionsMenu: React.FC<BlogActionsMenuProps> = ({
  blogId,
  onDelete,
  showReadOption = true,
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  const { isAuthenticated, isWebAdmin, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(apiEndpoints.deleteBlog(blogId), {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      // Call the onDelete callback if provided, otherwise navigate to home
      if (onDelete) {
        onDelete();
      } else {
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post. Please try again.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
      setShowMenu(false);
    }
  };

  // Check if user can see edit/delete options
  const canEditDelete = isAuthenticated && isWebAdmin();

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
          title="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Actions Menu */}
        {showMenu && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <div className="py-2">
                {showReadOption && (
                  <Link
                    to={`/post/${blogId}`}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read Post</span>
                  </Link>
                )}
                
                {/* Only show edit/delete for authenticated web-admin users */}
                {canEditDelete && (
                  <>
                    <Link
                      to={`/edit/${blogId}`}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setShowMenu(false)}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Post</span>
                    </Link>
                    
                    <div className={`my-1 border-t ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`} />
                    
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setShowDeleteConfirm(true);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                          : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Post</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal - Only show for web admins */}
      {showDeleteConfirm && canEditDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteConfirm(false)}
          />
          
          {/* Modal */}
          <div className={`relative w-full max-w-md rounded-xl shadow-xl border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`} />
                </div>
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Delete Blog Post
                </h3>
              </div>
              
              <p className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Are you sure you want to delete this blog post? This action cannot be undone and will permanently remove the post and all its content.
              </p>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    deleting
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    deleting
                      ? 'opacity-50 cursor-not-allowed bg-red-500 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {deleting ? 'Deleting...' : 'Delete Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
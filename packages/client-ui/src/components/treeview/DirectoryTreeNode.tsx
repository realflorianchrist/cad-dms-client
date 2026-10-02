import type { DirectoriesQuery } from '@workspace/api/generated';
import { useDirectory } from '@workspace/api/react';
import { useState } from 'react';
import { Link } from 'react-router';
import paths from '../../paths';
import TreeNode from './TreeNode';
import Chevron from './Chevron';
export default function DirectoryTreeNode({
  directory,
  depth = 0,
}: {
  directory: DirectoriesQuery['directories'][number];
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const query = useDirectory(directory.directoryId, { enabled: isOpen });
  const contents = query.data;

  return (
    <div>
      <TreeNode depth={depth}>
        <div className="flex w-full items-center">
          <Chevron
            isVisible={
              contents == null ||
              contents.directories.length > 0 ||
              contents.documents.length > 0
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Link
            to={paths.directory.to(directory.directoryId)}
            className="flex-1"
          >
            {directory.name}
            {directory.archived && ' (archived)'}
          </Link>
        </div>
      </TreeNode>
      {isOpen && (
        <>
          {query.isPending && <div role="status">Loading directory...</div>}
          {query.isError && (
            <div role="alert">
              Could not load directory: {query.error.message}
            </div>
          )}
          {contents === null && <div>Directory not found.</div>}
          {contents?.directories.map((child) => (
            <DirectoryTreeNode
              key={child.directoryId}
              depth={depth + 1}
              directory={child}
            />
          ))}
          {contents?.documents.map((document) => (
            <TreeNode key={document.documentId} depth={depth + 1}>
              <Chevron isVisible={false} isOpen={false} setIsOpen={() => {}} />
              <Link
                to={paths.document.to(
                  directory.directoryId,
                  document.documentId
                )}
              >
                {document.currentVersion.name}
                {document.currentVersion.extension &&
                  `.${document.currentVersion.extension}`}
                {document.archived && ' (archived)'}
              </Link>
            </TreeNode>
          ))}
        </>
      )}
    </div>
  );
}

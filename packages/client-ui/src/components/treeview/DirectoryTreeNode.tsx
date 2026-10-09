import type { DirectoriesQuery } from '@workspace/api/generated';
import { useDirectory } from '@workspace/api/react';
import { useState } from 'react';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { VscFile } from 'react-icons/vsc';
import { Link } from 'react-router';
import paths from '../../paths';
import Chevron from './Chevron';
import TreeNode from './TreeNode';

export default function DirectoryTreeNode({
  directory,
  depth = 0,
}: Readonly<{
  directory: DirectoriesQuery['directories'][number];
  depth?: number;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const query = useDirectory(directory.directoryId, { enabled: isOpen });
  const contents = query.data;

  return (
    <div>
      <TreeNode depth={depth}>
        <div className={'flex w-full items-center'}>
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
            className={'flex flex-1 items-center gap-2'}
          >
            <IoFolderOpenOutline />
            {directory.name}
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
              <Link
                to={paths.document.to(
                  directory.directoryId,
                  document.documentId
                )}
                className={'flex flex-1 items-center gap-2 pl-4'}
              >
                <VscFile />
                {document.currentVersion.name}
                {document.currentVersion.extension &&
                  `.${document.currentVersion.extension}`}
              </Link>
            </TreeNode>
          ))}
        </>
      )}
    </div>
  );
}

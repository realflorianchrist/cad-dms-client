import type { DirectoryQueryVariables } from '@workspace/api/generated';
import { useState } from 'react';
import TreeNode from './TreeNode';
import Chevron from './Chevron';
import { useDirectory } from '@workspace/api/react';

export default function DirectoryTreeNode({
  directoryId,
  depth = 0,
}: {
  directoryId: NonNullable<DirectoryQueryVariables['directoryId']>;
  depth?: number;
}) {
  const { data: directory, isLoading } = useDirectory(directoryId);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TreeNode depth={depth}>
        <div className={'flex items-center'}>
          <Chevron
            isVisible={directory != null && directory.directories.length > 0}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <div className={'flex flex-1 items-center gap-2'}>
            {isLoading && <div>...loading</div>}
            {directory?.name}
          </div>
        </div>
      </TreeNode>

      {isOpen &&
        directory?.directories.map((dir) => (
          <DirectoryTreeNode
            key={dir.directoryId}
            depth={depth + 1}
            directoryId={dir.directoryId}
          />
        ))}
    </div>
  );
}

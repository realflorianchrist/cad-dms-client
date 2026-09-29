import type { ProjectQuery } from '@/api/generated/graphql';
import { useState } from 'react';
import TreeNode from './TreeNode';
import Chevron from './Chevron';
import DirectoryTreeNode from './DirectoryTreeNode';

export default function ProjectTreeNode({
  project,
  depth = 0,
}: {
  project: NonNullable<ProjectQuery['project']>;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TreeNode depth={depth}>
        <div className={'flex items-center'}>
          <Chevron
            isVisible={project.directories.length > 0}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <div className={'flex flex-1 items-center gap-2'}>{project.name}</div>
        </div>
      </TreeNode>

      {isOpen &&
        project.directories.map((dir) => (
          <DirectoryTreeNode
            key={dir.directoryId}
            depth={depth + 1}
            directoryId={dir.directoryId}
          />
        ))}
    </div>
  );
}

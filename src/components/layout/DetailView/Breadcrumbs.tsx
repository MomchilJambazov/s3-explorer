import { useContext } from 'react';
import { TreeContext } from '@/contexts/TreeContext'
import { generateBreadcrumbs } from '@/utils/generateBreadcrumps'
import CreateFolderForm from '@/components/form/CreateFolderForm'
import Button from '@/components/ui/Button'
import Popover from '@/components/ui/Popover'

interface BreadcrumbsProps {
  currentDir: string | null;
  refetch: () => void;
  showCreateOptions: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentDir, refetch, showCreateOptions }) => {
  const { setCurrentDir } = useContext(TreeContext);
  const breadcrumbs = currentDir && generateBreadcrumbs(currentDir);

  return (
    <div className='card breadcrumps'>
      <div>
        <small onClick={() => setCurrentDir(null)}>/<b className='link'>root</b></small>
        {breadcrumbs && breadcrumbs?.map((item) => (
          <small key={item.path} onClick={() => setCurrentDir(item.path)}>/<b className='link'>{item.name}</b></small>
        ))}
      </div>
      <div>
        {showCreateOptions && 
          <>
            <Popover
              content={<div>This is the popover content</div>}
              trigger={<Button>Add file</Button>}
            />
            <Popover
              content={<CreateFolderForm refetch={refetch} dir={currentDir} />}
              trigger={<Button>New folder</Button>}
            />
          </>
        }
      </div>
    </div>
  );
};

export default Breadcrumbs;

import { useContext } from 'react';
import { TreeContext } from '@/contexts/TreeContext'
import { generateBreadcrumbs } from '@/utils/generateBreadcrumps'
import CreateFileForm from '@/components/form/CreateFileForm'
import CreateFolderForm from '@/components/form/CreateFolderForm'
import Button from '@/components/ui/Button'
import Popover from '@/components/ui/Popover'

interface BreadcrumbsProps {
  currentPath: string | null;
  refetch: () => void;
  showCreateOptions: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, refetch, showCreateOptions }) => {
  const { setCurrentPath } = useContext(TreeContext);
  const breadcrumbs = currentPath && generateBreadcrumbs(currentPath);

  return (
    <div className='card breadcrumps'>
      <div>
        <small onClick={() => setCurrentPath(null)}>/<b className='link'>root</b></small>
        {breadcrumbs && breadcrumbs?.map((item) => (
          <small key={item.path} onClick={() => setCurrentPath(item.path)}>/<b className='link'>{item.name}</b></small>
        ))}
      </div>
      <div>
        {showCreateOptions && 
          <>
            <Popover
              content={<CreateFileForm refetch={refetch} dir={currentPath} />}
              trigger={<Button>Add file</Button>}
            />
            <Popover
              content={<CreateFolderForm refetch={refetch} dir={currentPath} />}
              trigger={<Button>New folder</Button>}
            />
          </>
        }
      </div>
    </div>
  );
};

export default Breadcrumbs;

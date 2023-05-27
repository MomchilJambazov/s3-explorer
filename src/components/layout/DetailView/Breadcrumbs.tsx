import { useContext } from 'react';
import { TreeContext } from '@/contexts/TreeContext'
import { generateBreadcrumbs } from '@/utils/generateBreadcrumps'
import Button from '@/components/ui/Button'

interface BreadcrumbsProps {
  currentDir: string | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentDir }) => {
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
        <Button>Add file</Button>
        <Button>New folder</Button>
      </div>
    </div>
  );
};

export default Breadcrumbs;

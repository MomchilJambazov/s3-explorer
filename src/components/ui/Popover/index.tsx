import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

interface PopoverProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        anchorRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popover">
      <div className="trigger" ref={anchorRef} onClick={handleToggle}>
        {trigger}
      </div>
      {isOpen && <div className="content" ref={popoverRef}>{content}</div>}
    </div>
  );
};

export default Popover;
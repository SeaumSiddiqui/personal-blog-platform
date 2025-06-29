import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  targetNode?: Element;
}

export const Portal: React.FC<PortalProps> = ({ children, targetNode }) => {
  const target = targetNode || document.body;
  return createPortal(children, target);
};
import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * A dynamic icon renderer that takes a string name and returns the Lucide icon.
 * Usage: <LucideIcon name="Smartphone" size={24} color="red" />
 */
const LucideIcon = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    // Fallback if the icon name is not found
    console.warn(`LucideIcon: Icon "${name}" not found.`);
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;

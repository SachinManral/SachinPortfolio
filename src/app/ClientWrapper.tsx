'use client';
import { motion } from 'framer-motion';
import React from 'react';

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default ClientWrapper;

import React from 'react';
import './Status.scss';

type StatusProps = {
  message: string;
  className: string;
};

export default function Status({ message, className }: StatusProps) {
  return <div className={'status ' + className}>{message}</div>;
}

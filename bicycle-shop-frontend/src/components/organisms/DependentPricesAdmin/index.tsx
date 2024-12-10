'use client';

import { useState } from 'react';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import AddDependenceModal from '@/components/molecules/AddDependenceModal';
import DependenceCard from '@/components/molecules/DependenceCard';
import { DependentPrice, Option, Part } from '@/types/apiTypes';

interface DependentPricesAdminProps {
  option: Option;
  dependentPrices: DependentPrice[];
  parts: Part[];
}

const DependentPricesAdmin: React.FC<DependentPricesAdminProps> = ({
  option,
  dependentPrices,
  parts,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Dependent Prices
        </Text>
        <div className="flex flex-row gap-6">
          <Button onClick={() => setOpenModal(true)}>Add dependence</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {dependentPrices.map((dependence: DependentPrice) => (
          <DependenceCard
            key={dependence.id}
            dependence={dependence}
            optionId={option.id}
            partId={option.part.id}
          />
        ))}
      </div>
      {dependentPrices.length === 0 && (
        <Text as="p" size="lg" variant="muted">
          No dependencies associated with this part
        </Text>
      )}
      {openModal && (
        <AddDependenceModal
          option={option}
          onClose={() => setOpenModal(false)}
          parts={parts}
        />
      )}
    </>
  );
};

export default DependentPricesAdmin;

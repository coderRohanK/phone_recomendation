import React from 'react';
import { Phone } from '../types/phone';
import { Camera, Battery, Cpu, HardDrive, Smartphone, CircuitBoard } from 'lucide-react';

interface SpecificationComparisonProps {
  phone1: Phone;
  phone2: Phone;
}

export const SpecificationComparison: React.FC<SpecificationComparisonProps> = ({
  phone1,
  phone2,
}) => {
  const specs = [
    {
      icon: <Camera className="w-5 h-5" />,
      label: 'Camera',
      value1: `${phone1.specs.cameraMP}MP`,
      value2: `${phone2.specs.cameraMP}MP`,
      better: phone1.specs.cameraMP > phone2.specs.cameraMP ? 'left' : phone1.specs.cameraMP < phone2.specs.cameraMP ? 'right' : 'equal'
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      label: 'Storage',
      value1: `${phone1.specs.storageGB}GB`,
      value2: `${phone2.specs.storageGB}GB`,
      better: phone1.specs.storageGB > phone2.specs.storageGB ? 'left' : phone1.specs.storageGB < phone2.specs.storageGB ? 'right' : 'equal'
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      label: 'Processor',
      value1: `${phone1.specs.processorGHz}GHz`,
      value2: `${phone2.specs.processorGHz}GHz`,
      better: phone1.specs.processorGHz > phone2.specs.processorGHz ? 'left' : phone1.specs.processorGHz < phone2.specs.processorGHz ? 'right' : 'equal'
    },
    {
      icon: <Battery className="w-5 h-5" />,
      label: 'Battery',
      value1: `${phone1.specs.batteryMAh}mAh`,
      value2: `${phone2.specs.batteryMAh}mAh`,
      better: phone1.specs.batteryMAh > phone2.specs.batteryMAh ? 'left' : phone1.specs.batteryMAh < phone2.specs.batteryMAh ? 'right' : 'equal'
    },
    {
      icon: <CircuitBoard className="w-5 h-5" />,
      label: 'RAM',
      value1: `${phone1.specs.ram}GB`,
      value2: `${phone2.specs.ram}GB`,
      better: phone1.specs.ram > phone2.specs.ram ? 'left' : phone1.specs.ram < phone2.specs.ram ? 'right' : 'equal'
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      label: 'Display',
      value1: `${phone1.specs.display.size}" ${phone1.specs.display.type}`,
      value2: `${phone2.specs.display.size}" ${phone2.specs.display.type}`,
      better: phone1.specs.display.size > phone2.specs.display.size ? 'left' : phone1.specs.display.size < phone2.specs.display.size ? 'right' : 'equal'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg animate-fadeIn">
      <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
        Detailed Specifications
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className="grid grid-cols-7 items-center p-4 rounded-lg hover:bg-purple-50 transition-colors animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="col-span-2 text-right">
              <div className={`inline-flex items-center justify-end gap-2 font-medium ${spec.better === 'left' ? 'text-green-600' : 'text-gray-700'}`}>
                {spec.value1}
                {spec.better === 'left' && <span className="text-xs">↑</span>}
              </div>
            </div>
            
            <div className="col-span-3 flex flex-col items-center justify-center gap-1">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
              <div className="flex items-center gap-2 text-purple-600">
                {spec.icon}
                <span className="text-sm font-medium">{spec.label}</span>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
            </div>
            
            <div className="col-span-2">
              <div className={`inline-flex items-center gap-2 font-medium ${spec.better === 'right' ? 'text-green-600' : 'text-gray-700'}`}>
                {spec.value2}
                {spec.better === 'right' && <span className="text-xs">↑</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
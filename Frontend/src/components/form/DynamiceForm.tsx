import React from 'react'
import type { FieldConfig } from '../../config/authConfig'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
type Props = {
  formType: string,
  fields: FieldConfig[],
  onSubmit: (formData: Record<string, string>) => void;
}
const DynamiceForm: React.FC<Props> = ({ formType, fields, onSubmit }) => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }
  return (
    <div className='flex items-center justify-center w-full h-full '>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        {fields.map((f) => (
          <div key={f.name} className='mb-3'>
            <label className='block mb-1'>{f.label}</label>
            <Input
              type={f.type}
              name={f.name}
              value={formData[f.name] || ''}
              onChange={handleChange}
              className='border border-gray-300 p-2 rounded w-[400px] '
              placeholder={f.placeholder}
            />
          </div>
        ))}
        <Button type='submit' className='bg-blue-500 text-white p-2 rounded hover:cursor-pointer w-full'>
          {formType}
        </Button>
      </form>
    </div>
  )
}

export default DynamiceForm

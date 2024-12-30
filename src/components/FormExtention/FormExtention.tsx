import React from 'react'


interface FormExtentionProps {
    setExtentionToConvert: (value: string) => void;
  }

export const FormExtention : React.FC<FormExtentionProps>= ({
    setExtentionToConvert}) => {
  return (
    <div>
        <form>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Extension de conversion</label>
                  <select className='cursor-pointer block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  ' onClick={(e)=>{setExtentionToConvert(e.target.value)}} name="extensionToConvert" id="">
                    <option value="jpg">JPG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                </select>


        </form>

    </div>
  )
}

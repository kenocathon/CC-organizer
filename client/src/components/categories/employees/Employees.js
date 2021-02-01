import React from 'react';

function Employees() {
  return (
    <section>
      <h1 className='category-title'>Employees</h1>
      <div className='main-content'>
        <form className='basic-form'>
          <h3 className='category-subtitle'>Create New Employee</h3>
          <label htmlFor='first-name' className='form-field-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-field-normal'
            name='first-name'
            id='first-name'
          />
          <label htmlFor='last-name' className='form-field-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-field-normal'
            name='last-name'
            id='last-name'
          />
          <label htmlFor='phone-number' className='form-field-label'>
            Phone Number
          </label>
          <input
            type='phone'
            className='form-field-normal'
            name='phone-number'
            id='phone-number'
          />
          <button>Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Employees;

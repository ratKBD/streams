import React from 'react';
import { Field, Form } from 'react-final-form';  


const StreamForm = (props) => {
    const renderError = ({error, touched}) => {
            if(touched && error) {
                return (
                    <div className='ui error message'>
                        <div className='header'>{error}</div>
                    </div>
                )
            }
        }
    

    const renderInput=({input, label, meta})=> {
        
                const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        
                return (
                    <div className={className} >
                        <label>{label}</label>
                        <input {...input} autoComplete='off' />
                        {renderError(meta)}
                    </div>
                
                );
                };
        
           const onSubmit=(formValues)=>{
                        props.onSubmit(formValues)
                    }

            return (
                <Form initialValues={props.initialValues} onSubmit={onSubmit} validate={(formValues)=>{
                    const errors = {};

                    if(!formValues.title) {
                        errors.title = "You must enter title";
                    }
                    if(!formValues.description) {
                        errors.description = "You must enter description"
                    }
                    return errors;
                }}

                render={({handleSubmit})=>(
                    <Form onSubmit={handleSubmit} className='ui form error'>
                        <Field name="title" component={renderInput} label="Enter Title" />
                        <Field name='description' component={renderInput} label="Enter Description" />
                        <button className='ui button primary'>Submit</button>
                    </Form>
                )}
                />
            );
                };

export default StreamForm;
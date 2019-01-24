import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import fields from './fields';

const stringToComponentMapper = {
  input: 'input',
  radio: 'checkbox',
  select: 'select'
}
//
//const FormGenerator = ({ fields }) => (
//  <div>
//    <Row>
//      {fields.map(f => (
//        <Col md={6} key={f.name}>
//          <Field
//            name={f.name}
//            component="input"
//            type="text"
//            label={f.label}
//          />
//        </Col>
//      ))}
//    </Row>
//  </div>
//)

class FormGenerator extends Component {
	
	generateFields= () => {
		let form = fields.values.map(field => {
			return (
				<Col md={6} key={field.name}>
					<label>{field.label}</label>
					<Field name={field.name} component={field.component} type={field.type} label={field.label} />
				</Col>
			);
		});
		return form;
	}
	
	render() {
		let form = this.generateFields();
		return ( <div>{form}</div> );
	}
}

export default reduxForm({
	form: 'test'
})(FormGenerator)


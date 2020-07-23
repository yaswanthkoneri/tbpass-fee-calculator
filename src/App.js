import React from 'react';
import logo from './logo.svg';
import './App.css';
import  { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [applicationType, setApplicationType] = useState('Single Window');
  const [buildingPurpose, setBuildingPurpose] = useState('Residential');
  const [authority, setAuthority] = useState('DTCP');
  const [ulbGrade, setUlbGrade] = useState('GRADE 1');
  const [plotArea, setPlotArea] = useState('');
  const [height, setHeight] = useState('');
  const [floors, setFloors] = useState('');
  const [approvalType, setApprovalType] = useState('Approved Layout Plan');
  const [netPlotArea, setNetPlotArea] = useState('');
  const [builtupArea, setBuiltupArea] = useState('');
  const [validated, setvalidated] = useState(false);
  const [fees, setFees] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setvalidated(true);
    } else {
      let feeInput = {
        Plot_area: plotArea,
        Height: height,
        No_of_floors: floors,
        Application_type: applicationType,
        Building_purpose: buildingPurpose,
        Authority: authority,
        Ulb_grade: ulbGrade,
        Approval_type: approvalType,
        net_plot_area: netPlotArea,
        total_builtup_area: builtupArea,
      };
      console.log(feeInput);
      handleService();
    }
  };

  const handleService = () => {
    axios
      .get(
        `http://hyno-external-rails-new-1353938241.ap-southeast-1.elb.amazonaws.com/api/v1/fee_calculator/get_total_fee_breakup?application_type=${applicationType}&building_purpose=${buildingPurpose}&authority=${authority}&ulb_grade=${ulbGrade}&plot_area=${plotArea}&height=${height}&no_of_floors=${floors}&net_plot_area=${netPlotArea}&total_built_up_area=${builtupArea}`
      )
      .then((res) => {
        setFees(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="App">

    <>
      <div
        className=" px-5 pb-5"
        style={{ paddingTop: '83px', overflow: 'auto', height: '100%' }}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Application Type</Form.Label>
            <Form.Control
              as="select"
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
            >
              <option>Single Window</option>
              <option>Self Certification</option>
              <option>Registration</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Building Purpose</Form.Label>
            <Form.Control
              as="select"
              value={buildingPurpose}
              onChange={(e) => setBuildingPurpose(e.target.value)}
            >
              <option>Residential</option>
              <option>Non Residential</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Authority</Form.Label>
            <Form.Control
              as="select"
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
            >
              <option>DTCP</option>
              <option>HMDA</option>
              <option>GHMC</option>
              <option>OTHERS</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Ulb Grade</Form.Label>
            <Form.Control
              as="select"
              value={ulbGrade}
              onChange={(e) => setUlbGrade(e.target.value)}
            >
              <option>GRADE 1</option>
              <option>GRADE 2</option>
              <option>GRADE 3</option>
              <option>MUNICIPAL CORPORATION</option>
              <option>SPECIAL GRADE</option>
              <option>UDA</option>
              <option>GWMC</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Plot Area</Form.Label>
            <Form.Control
              type="number"
              value={plotArea}
              onChange={(e) => setPlotArea(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              {...(height <= 10 ? {} : { isInvalid: true })}
            />
            <Form.Control.Feedback type="invalid">
              Please choose height less than 10
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>No of floors</Form.Label>
            <Form.Control
              type="number"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Approval Type</Form.Label>
            <Form.Control
              as="select"
              value={approvalType}
              onChange={(e) => setApprovalType(e.target.value)}
            >
              <option>Approved Layout Plan</option>
              <option>Approved Building Plan</option>
              <option>Building Under BPS</option>
              <option>LRS Approved</option>
              <option>Gramkantam</option>
              <option>Abadi</option>
              <option>Before 1985</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Net Plot Area</Form.Label>
            <Form.Control
              type="number"
              value={netPlotArea}
              onChange={(e) => setNetPlotArea(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Total Builtup Area</Form.Label>
            <Form.Control
              type="number"
              value={builtupArea}
              onChange={(e) => setBuiltupArea(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              {Object.entries(fees).map(([key, value, index]) => {
                return <th key={index}>{key}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.entries(fees).map(([key, value, index]) => {
                return <td key={index}>{value}</td>;
              })}
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
    </div>
  );
}

export default App;

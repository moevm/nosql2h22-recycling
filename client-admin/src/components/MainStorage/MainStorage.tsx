import React, { useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {ratios, metal, paper, plastic, glass, organic, battery} from "./MainStorage.helpers";
import {TableData} from "../TableData/TableData";
import {columns, header} from "./MainStorage.content"
import {Container, Col, Row} from "react-bootstrap";
import {CSVLink} from "react-csv";

export const MainStorage = () => {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSubType, setSubType] = useState<string>('All');
    const [currentData, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [exportedData,setExportedData] = useState<Array<any>>([]);

    const [startDate,setStartDate] = useState<string>("");
    const [finishDate,setFinishDate] = useState<string>("");

    const [client, setClient] = useState<string>("");
    const [driver, setDriver] = useState<string>("");

    const [lowerAmount, setLowerAmount] = useState<string>("");
    const [upperAmount, setUpperAmount] = useState<string>("");
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const [show, setShow] = useState<boolean>(false);

    const [userFile, setUserFile] = useState("");
    const [userJSON, setUserJSON] = useState({});

    const [ordersFile, setOrdersFile] = useState("");
    const [ordersJSON, setOrdersJSON] = useState({});



    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const exportData = () =>{
        fetch('http://localhost:8000/api/admin/main', {
                method:"POST",
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
            body: JSON.stringify({filters:{
                    type:selectedType,
                    subType: selectedSubType,
                    user: client,
                    driver:driver,
                    amount:{
                        from: lowerAmount,
                        to: upperAmount
                    },
                    date:{
                        from:startDate,
                        to: finishDate,
                    }}  ,page: page, perPage:perPage})
            }
        )
            .then(response => response.json())
            .then(content => {
                setExportedData(content.orders);
            })
            .catch(err => console.error(err));
    }

    const getData = () => {
        fetch('http://localhost:8000/api/admin/main', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({filters:{
                type:selectedType,
                subType: selectedSubType,
                user: client,
                driver:driver,
                amount:{
                    from: lowerAmount,
                    to: upperAmount
                },
                date:{
                    from:startDate,
                    to: finishDate,
                }}  ,page: page, perPage:perPage})
        }
        )
            .then(response => response.json())
            .then(content => {
                setData(content.orders);
                setTotal(content.countOrders);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData();
        exportData();
    }, [])

    useEffect(() => {
        getData();
    }, [selectedType, selectedSubType,page, perPage])

    const showSubtypes = () => {
        switch(selectedType){
            case 'Metal':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {metal.map((metal)=>(
                            <option>
                                {metal.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Plastic':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {plastic.map((plastic)=>(
                            <option>
                                {plastic.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Glass':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {glass.map((glass)=>(
                            <option>
                                {glass.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Organic':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {organic.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Battery':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {battery.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Paper':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {paper.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
        }
    }

    const handleOrders = (e:any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.addEventListener('load', (event) => {
            try{
                // @ts-ignore
                setOrdersJSON(JSON.parse(event.target.result));
            }
            catch (e){
                alert("Wrong");
            }
        });
        reader.readAsText(file);
    }

    const handleUsers = (e:any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.addEventListener('load', (event) => {
            try{
                // @ts-ignore
                setUserJSON(JSON.parse(event.target.result));
            }
            catch (e){
                alert("Wrong");
            }
        });
        reader.readAsText(file);
    }

    const sendObjects = () => {
        console.log(userJSON);
        console.log("======================================================");
        console.log(ordersJSON);
            fetch('http://localhost:8000/api/admin/import', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        users:  userJSON,
                        orders: ordersJSON
                    })
                }
            )
                .then(response => response.json())
                .then(message => {
                    if(message !== "OK"){
                        alert("плохо")
                    }
                })
                .catch(err => console.error(err));
    }

    return (
        <>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>File import.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <label>Choose users json:</label>
                        <input type='file'
                               accept="application/JSON"
                               onChange = {handleUsers}
                               style={{marginLeft: "2vh", marginTop:"1vh"}}
                        />
                    </>
                    <>
                        <label>Choose orders json:</label>
                        <input type='file'
                               accept="application/JSON"
                               style={{marginLeft: "1vh", marginTop:"1vh"}}
                               onChange={handleOrders}
                        />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={sendObjects} variant="primary">Submit</Button>
                    <Button onClick={()=>{
                        setShow(false);
                    }}
                            variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
            <div>
                {ratios.map((radio,idx)=>(
                    <>
                        <input
                            type='radio'
                            id={`radio-${idx}`}
                            value={radio.name}
                            name='recycle'
                            style={{margin: '0vh 3vh 0vh 0vh'}}
                            onChange={radioHandler}
                        />
                        <label style={{margin: '0vh 3vh 0vh -2vh'}}>{radio.name}</label>
                    </>
                ))}
                <CSVLink style={{color:'white',textDecoration: 'none'}} data={exportedData} headers={header} separator={";"} filename="AdminStorageTable">
                    <Button onClick={exportData} style={{width: '30vh'}} variant='success' >
                        Export table to SCV
                    </Button>
                </CSVLink>
                <>
                    <Button onClick={()=>{setShow(true)}} style={{width: '30vh', marginLeft:"1vh"}} variant='success' >
                        Import DB
                    </Button>
                </>
                <div style={{width: '108vh',marginTop:'3vh'}}>
                    {showSubtypes()}
                </div>
                <Form.Check
                    style = {{width:"50vh",marginTop:'3vh'}}
                    type="switch"
                    label="Show additional filters"
                    onChange={()=>{setShowAdd(!showAdd)}}
                />
                {showAdd && <Container style={{width: '99%', margin: '3vh 0vh 3vh 0vh'}}>
                    <Row>
                        <Col lg={3}>
                            <>
                                <label style={{margin: '0vh 3vh 0vh 0vh'}}>Start date:</label>
                                <input
                                    type='date'
                                    style={{margin: '0vh 3vh 0vh 0vh'}}
                                    onChange={(e) => {
                                        setStartDate(e.target.value)
                                    }}
                                />
                            </>
                        </Col>
                        <Col>
                            <>
                                <label>Amount from:</label>
                                <input
                                    type='number'
                                    min={0}
                                    style={{margin: '0vh 1vh 0vh 2vh'}}
                                    placeholder="Amount from:"
                                    onChange={(e) => {
                                        setLowerAmount(e.target.value)
                                    }}
                                />
                            </>
                        </Col>
                        <Col lg={2}>
                            <input
                                type='search'
                                style={{margin: '0vh 1vh 0vh 0vh'}}
                                placeholder="Search user"
                                onChange={(e) => {
                                    setClient(e.target.value)
                                }}
                            />
                        </Col>
                        <Col lg={3}>
                            <>
                                <Button variant="success" onClick={getData}>Update table</Button>
                            </>
                        </Col>
                    </Row>
                    <Row style={{margin: "2vh 0vh 0vh -1.5vh"}}>
                        <Col lg={3}>
                            <>
                                <label style={{margin: '0vh 3vh 0vh 0vh'}}>Finish date:</label>
                                <input
                                    type='date'
                                    style={{margin: '0vh 3vh 0vh -1vh'}}
                                    onChange={(e) => {
                                        setFinishDate(e.target.value)
                                    }}
                                />
                            </>
                        </Col>
                        <Col lg={4}>
                            <>
                                <label>Amount to:</label>
                                <input
                                    type='number'
                                    style={{margin: '0vh 1vh 0vh 5vh'}}
                                    min={0}
                                    placeholder="Amount to:"
                                    onChange={(e) => {
                                        setUpperAmount(e.target.value)
                                    }}
                                />
                            </>
                        </Col>
                        <Col>
                            <input
                                type='search'
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Search driver"
                                onChange={(e) => {
                                    setDriver(e.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                }
            </div>
            <TableData
                total={total}
                setPage={setPage}
                setPerPage={setPerPage}
                page={page}
                perPage={perPage}
                tableCells={currentData}
                header={columns}
            />
        </>
    );
};

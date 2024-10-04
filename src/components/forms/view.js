import { Space, Form, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";

export default function CrewView({
    children,
    selectedItemForView,
    getCrew,
    formatDate
}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [rank, setRank] = useState('');
    const [age, setAge] = useState('');
    const [bmi, setBmi] = useState(null);

    const initComponents = async () => {
        const { crew } = await getCrew(selectedItemForView);
        const bday = formatDate(crew.birth_date, "MMM DD, YYYY");
        setFirstName(crew.first_name);
        setLastName(crew.last_name);
        setMiddleName(crew.middle_name);
        setEmail(crew.email);
        setAddress(crew.address);
        setHeight(crew.height);
        setWeight(crew.weight);
        setAge(crew.age);
        setRank(crew.rank.name);
        setBirthDate(bday.toString());
        if(crew.height && crew.weight) {
            computeBMI(crew.height, crew.weight);
        }
    }

    const computeBMI = (bheight, bweight) => {
        const solution = bweight / (Math.pow((bheight * 0.01), 2));
        let description = '(Normal)';
        if(solution >= 25) {
            description = '(Overweight)';
        }
        setBmi(solution.toFixed(2).toString() + ' ' + description);
    }

    useEffect(() => {
        initComponents();
    }, []);

    return (
        <>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">First Name:</p> {firstName}</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Last Name:</p> {lastName}</Space>
                </div>
            </div>

            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Middle Name:</p> {middleName}</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Email:</p> {email}</Space>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Age:</p> {age} cm.</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Date of Birth:</p> {birthDate}</Space>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Height:</p> {height} cm.</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Weight:</p> {weight} kg.</Space>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Rank:</p> {rank}</Space>
                </div>
                { bmi && (
                  <div className="col">
                    <Space><p className="h6">BMI:</p> {bmi}</Space>
                  </div>
                )}
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Address:</p> {address}</Space>
                </div>
            </div>
        </>
    );
}

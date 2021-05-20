/* eslint-disable react/prop-types */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';


export default function Chart(props) {
    const { meal } = props;

    const data = {
        labels: ['Baltymai', 'Riebalai', 'Angliavandeniai'],
        datasets: [
            {
                label: '# of kcal',
                data: [meal.protein, meal.fat, meal.carbohydrates],
                backgroundColor: [
                    'rgba(60, 179, 113, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)'
                ],
                borderColor: [
                    'rgba(60, 179, 113, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Doughnut data={data} />
        </>
    );
}
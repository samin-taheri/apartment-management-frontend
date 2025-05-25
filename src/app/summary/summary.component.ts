import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApartmentService } from '../services/apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  constructor(private service: ApartmentService, private router: Router) {}

  expenses: any[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
    this.service.getIncome().subscribe((income) => {
      this.service.getExpenseSummary().subscribe((summary) => {
        const totalExpenses = Object.values(summary).reduce(
          (acc: number, val: any) => acc + Number(val),
          0
        );

        this.barChartData.datasets[0].data = [income || 0, totalExpenses];
        this.chart?.update();
      });
    });

    this.service.getAllExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }
}

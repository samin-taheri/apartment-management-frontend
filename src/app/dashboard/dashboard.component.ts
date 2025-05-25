import { Component, ViewChild } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  isLoading = false;

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  pieChartData: ChartData<'pie'> = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  constructor(
    private service: ApartmentService,
    private toast: ToastService,
    private router: Router
  ) {}
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

        this.pieChartData.datasets[0].data = [income || 0, totalExpenses];
        this.chart?.update();
      });
    });
  }

  generateDues() {
    this.isLoading = true;
    this.service.generateMonthlyDues().subscribe({
      next: (res: any) => {
        const msg = typeof res === 'string' ? res : res?.message || 'Success';
        this.toast.showSuccess(msg);
        this.isLoading = false;
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Failed to generate dues.';
        this.toast.showError(errorMsg);
        this.isLoading = false;
      },
    });
  }
}

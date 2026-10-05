# Ticket Insights — Support Operations Dashboard

An interactive portfolio dashboard for exploring a fictional IT support ticket dataset. It demonstrates operational reporting, KPI definitions, SQL aggregations, and a responsive data interface. All records are synthetic; this project does not connect to the Ticket Desk application.

## Run it

Open `index.html` in a modern browser. No build tools, database, or package installation are required. The demo data and dashboard logic are included in `app.js`.

## Dashboard features

- KPI cards for ticket count, unresolved workload, average resolution time, and SLA attainment.
- Filters for date range, priority, and assigned team.
- Searchable recent-ticket table.
- Monthly ticket-volume trend and category breakdown.
- CSV export of the currently filtered dataset.
- Responsive layout for desktop and mobile screens.

## SQL and dataset

`sql/analytics.sql` contains a SQL Server table definition and reporting queries corresponding to the dashboard metrics. The starter dataset is embedded in `app.js` to make the page easy to run locally without a server; rows are fictional and use October 4, 2026 as the demo's reporting date.

## Metric definitions

- **Open tickets:** tickets whose status is `Open` or `In Progress`.
- **Average resolution:** arithmetic mean of resolution hours for resolved tickets.
- **SLA met:** percentage of resolved tickets marked as resolved within the 24-hour target.
- **Date range filter:** filters by ticket creation date, with the demo reporting date fixed at October 4, 2026 for repeatable results.

## Project structure

```text
ticket-insights/
├── index.html
├── styles.css
├── app.js
└── sql/
    └── analytics.sql
```

## Portfolio note

This is a front-end analytics prototype with example SQL. It does not currently connect to SQL Server, Power BI, or a live ticketing API. Describe only the implemented features on a resume.

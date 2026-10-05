/* Ticket Insights sample schema and reporting queries for SQL Server. */
CREATE TABLE dbo.SupportTickets (
    TicketId varchar(12) NOT NULL PRIMARY KEY,
    Subject nvarchar(200) NOT NULL,
    Category nvarchar(50) NOT NULL,
    Priority varchar(10) NOT NULL CHECK (Priority IN ('Low','Medium','High','Critical')),
    Status varchar(20) NOT NULL CHECK (Status IN ('Open','In Progress','Resolved')),
    Team nvarchar(50) NOT NULL,
    CreatedAt date NOT NULL,
    ResolutionHours decimal(7,2) NULL,
    SlaMet bit NOT NULL
);

-- KPI: ticket count and unresolved workload during the last 90 days.
SELECT COUNT(*) AS TotalTickets,
       SUM(CASE WHEN Status <> 'Resolved' THEN 1 ELSE 0 END) AS OpenTickets
FROM dbo.SupportTickets
WHERE CreatedAt >= DATEADD(day, -90, CONVERT(date, GETDATE()));

-- Resolution time and SLA attainment for completed tickets.
SELECT AVG(ResolutionHours) AS AverageResolutionHours,
       CAST(100.0 * SUM(CASE WHEN SlaMet = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) AS decimal(5,1)) AS SlaMetPercent
FROM dbo.SupportTickets
WHERE Status = 'Resolved' AND ResolutionHours IS NOT NULL;

-- Monthly volume trend.
SELECT DATEFROMPARTS(YEAR(CreatedAt), MONTH(CreatedAt), 1) AS TicketMonth,
       COUNT(*) AS TicketsCreated
FROM dbo.SupportTickets
GROUP BY DATEFROMPARTS(YEAR(CreatedAt), MONTH(CreatedAt), 1)
ORDER BY TicketMonth;

-- Ticket category and team distribution.
SELECT Category, Team, COUNT(*) AS TicketCount
FROM dbo.SupportTickets
GROUP BY Category, Team
ORDER BY TicketCount DESC;

-- SLA performance by priority.
SELECT Priority, COUNT(*) AS ResolvedTickets,
       SUM(CASE WHEN SlaMet = 1 THEN 1 ELSE 0 END) AS WithinSla,
       CAST(100.0 * SUM(CASE WHEN SlaMet = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) AS decimal(5,1)) AS SlaMetPercent
FROM dbo.SupportTickets
WHERE Status = 'Resolved'
GROUP BY Priority
ORDER BY CASE Priority WHEN 'Critical' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 ELSE 4 END;

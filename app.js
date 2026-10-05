const tickets = [
 {id:"TD-1042",subject:"Cannot connect to office Wi-Fi",category:"Network",priority:"High",status:"In Progress",team:"Infrastructure",created:"2026-10-03",hours:7,sla:true},
 {id:"TD-1041",subject:"Payroll report shows duplicate rows",category:"Reporting",priority:"Critical",status:"Open",team:"Applications",created:"2026-10-02",hours:null,sla:false},
 {id:"TD-1040",subject:"Reset account password",category:"Access",priority:"Low",status:"Resolved",team:"IT Support",created:"2026-10-01",hours:2,sla:true},
 {id:"TD-1039",subject:"Finance app loading slowly",category:"Performance",priority:"High",status:"In Progress",team:"Applications",created:"2026-09-30",hours:19,sla:true},
 {id:"TD-1038",subject:"Request access to shared drive",category:"Access",priority:"Medium",status:"Resolved",team:"IT Support",created:"2026-09-29",hours:11,sla:true},
 {id:"TD-1037",subject:"Printer not responding on floor 2",category:"Hardware",priority:"Medium",status:"Open",team:"Infrastructure",created:"2026-09-28",hours:null,sla:false},
 {id:"TD-1036",subject:"Update user department in directory",category:"Access",priority:"Low",status:"Resolved",team:"IT Support",created:"2026-09-26",hours:4,sla:true},
 {id:"TD-1035",subject:"Monthly enrollment export failed",category:"Reporting",priority:"Critical",status:"Resolved",team:"Applications",created:"2026-09-24",hours:20,sla:true},
 {id:"TD-1034",subject:"Laptop battery drains quickly",category:"Hardware",priority:"Medium",status:"In Progress",team:"Infrastructure",created:"2026-09-21",hours:null,sla:false},
 {id:"TD-1033",subject:"Email attachments not syncing",category:"Network",priority:"High",status:"Resolved",team:"IT Support",created:"2026-09-18",hours:22,sla:true},
 {id:"TD-1032",subject:"Incorrect total in budget dashboard",category:"Reporting",priority:"High",status:"Resolved",team:"Applications",created:"2026-09-15",hours:27,sla:false},
 {id:"TD-1031",subject:"New employee account setup",category:"Access",priority:"Medium",status:"Resolved",team:"IT Support",created:"2026-09-12",hours:9,sla:true},
 {id:"TD-1030",subject:"VPN disconnects after sign-in",category:"Network",priority:"High",status:"Open",team:"Infrastructure",created:"2026-09-09",hours:null,sla:false},
 {id:"TD-1029",subject:"Application error when saving form",category:"Software",priority:"Critical",status:"Resolved",team:"Applications",created:"2026-09-06",hours:15,sla:true},
 {id:"TD-1028",subject:"Replace damaged keyboard",category:"Hardware",priority:"Low",status:"Resolved",team:"IT Support",created:"2026-09-03",hours:5,sla:true},
 {id:"TD-1027",subject:"Shared mailbox permission request",category:"Access",priority:"Medium",status:"Resolved",team:"IT Support",created:"2026-08-30",hours:13,sla:true},
 {id:"TD-1026",subject:"SSRS subscription did not run",category:"Reporting",priority:"High",status:"Resolved",team:"Applications",created:"2026-08-27",hours:18,sla:true},
 {id:"TD-1025",subject:"Monitor flickering intermittently",category:"Hardware",priority:"Low",status:"Resolved",team:"Infrastructure",created:"2026-08-23",hours:6,sla:true},
 {id:"TD-1024",subject:"Slow file transfer to shared folder",category:"Network",priority:"Medium",status:"Resolved",team:"Infrastructure",created:"2026-08-18",hours:30,sla:false},
 {id:"TD-1023",subject:"Unable to open case management app",category:"Software",priority:"Critical",status:"Resolved",team:"Applications",created:"2026-08-13",hours:21,sla:true},
 {id:"TD-1022",subject:"Request second monitor",category:"Hardware",priority:"Low",status:"Resolved",team:"IT Support",created:"2026-08-08",hours:10,sla:true},
 {id:"TD-1021",subject:"Update report filter options",category:"Reporting",priority:"Medium",status:"Resolved",team:"Applications",created:"2026-08-03",hours:16,sla:true},
 {id:"TD-1020",subject:"Cannot access staff portal",category:"Access",priority:"High",status:"Resolved",team:"IT Support",created:"2026-07-28",hours:23,sla:true},
 {id:"TD-1019",subject:"Intermittent network drop in meeting room",category:"Network",priority:"High",status:"Resolved",team:"Infrastructure",created:"2026-07-22",hours:35,sla:false},
 {id:"TD-1018",subject:"Database timeout in scheduling app",category:"Performance",priority:"Critical",status:"Resolved",team:"Applications",created:"2026-07-16",hours:26,sla:false},
 {id:"TD-1017",subject:"New staff email account",category:"Access",priority:"Medium",status:"Resolved",team:"IT Support",created:"2026-07-10",hours:8,sla:true},
 {id:"TD-1016",subject:"Laptop camera not detected",category:"Hardware",priority:"Medium",status:"Resolved",team:"Infrastructure",created:"2026-07-04",hours:12,sla:true},
 {id:"TD-1015",subject:"Quarterly attendance report request",category:"Reporting",priority:"Low",status:"Resolved",team:"Applications",created:"2026-06-28",hours:18,sla:true},
 {id:"TD-1014",subject:"Password lockout after update",category:"Access",priority:"High",status:"Resolved",team:"IT Support",created:"2026-06-20",hours:3,sla:true},
 {id:"TD-1013",subject:"Replace faulty docking station",category:"Hardware",priority:"Medium",status:"Resolved",team:"Infrastructure",created:"2026-06-12",hours:28,sla:false}
];

const $ = (id) => document.getElementById(id);
const fmtDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString("en-CA", {month:"short", day:"numeric"});
function filteredTickets() {
  const days = Number($("range-filter").value);
  const cutoff = days ? new Date("2026-10-04T23:59:59") : null;
  if (cutoff) cutoff.setDate(cutoff.getDate() - days);
  return tickets.filter(t => (!cutoff || new Date(`${t.created}T12:00:00`) >= cutoff) && ($("priority-filter").value === "all" || t.priority === $("priority-filter").value) && ($("team-filter").value === "all" || t.team === $("team-filter").value));
}
function renderMetrics(rows) {
  const resolved = rows.filter(t => t.status === "Resolved" && t.hours !== null);
  const avg = resolved.length ? resolved.reduce((sum, t) => sum + t.hours, 0) / resolved.length : 0;
  const sla = resolved.length ? resolved.filter(t => t.sla).length / resolved.length * 100 : 0;
  $("total-tickets").textContent = rows.length;
  $("open-tickets").textContent = rows.filter(t => t.status !== "Resolved").length;
  $("avg-resolution").innerHTML = `${avg.toFixed(1)}<small> hrs</small>`;
  $("sla-met").innerHTML = `${sla.toFixed(0)}<small>%</small>`;
}
function renderVolume(rows) {
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct"], nums = [6,7,8,9,10];
  const values = months.map((_, i) => rows.filter(t => Number(t.created.slice(5,7)) === nums[i]).length);
  const max = Math.max(5, ...values), x0 = 34, y0 = 16, w = 460, h = 128;
  const points = values.map((v, i) => [x0 + i*w/(months.length-1), y0+h-v/max*h]);
  const line = points.map((p,i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" "), area = `${line} L${points.at(-1)[0]},${y0+h} L${points[0][0]},${y0+h} Z`;
  const grid = [0,.5,1].map(f => `<line class="gridline" x1="${x0}" y1="${y0+h*f}" x2="${x0+w}" y2="${y0+h*f}"/><text class="axis-label" x="2" y="${y0+h*f+3}">${Math.round(max*(1-f))}</text>`).join("");
  const labels = months.map((m,i) => `<text class="axis-label" text-anchor="middle" x="${x0+i*w/(months.length-1)}" y="${y0+h+20}">${m}</text>`).join("");
  const dots = points.map(([x,y],i) => `<circle class="volume-point" cx="${x}" cy="${y}" r="3.5"><title>${months[i]}: ${values[i]} tickets</title></circle>`).join("");
  $("volume-chart").innerHTML = `<svg class="volume-svg" viewBox="0 0 510 180" preserveAspectRatio="none"><defs><linearGradient id="volumeGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#7075ed" stop-opacity=".20"/><stop offset="100%" stop-color="#7075ed" stop-opacity="0"/></linearGradient></defs>${grid}<path class="volume-fill" d="${area}"/><path class="volume-line" d="${line}"/>${dots}${labels}</svg>`;
}
function renderCategories(rows) {
  const categories = [...new Set(tickets.map(t => t.category))].map(name => [name, rows.filter(t => t.category === name).length]).sort((a,b) => b[1]-a[1]), max = Math.max(1, ...categories.map(c => c[1]));
  $("category-chart").innerHTML = categories.map(([name,count]) => `<div class="category-row"><div class="category-meta"><strong>${name}</strong><span>${count} <span style="color:#a1a9b7">tickets</span></span></div><div class="bar-track"><div class="bar-fill" style="width:${count/max*100}%"></div></div></div>`).join("");
}
function renderTable(rows) {
  const query = $("search-input").value.trim().toLowerCase(), found = rows.filter(t => Object.values(t).some(v => String(v ?? "").toLowerCase().includes(query))).slice(0,10);
  $("ticket-rows").innerHTML = found.map(t => `<tr><td>${t.id}</td><td class="subject">${t.subject}</td><td>${t.category}</td><td><span class="badge priority-${t.priority}">${t.priority}</span></td><td><span class="badge status-${t.status.replace(" ", "-")}">${t.status}</span></td><td>${t.team}</td><td>${fmtDate(t.created)}</td></tr>`).join("") || `<tr><td colspan="7" style="text-align:center;padding:24px;color:#8993a5">No tickets match these filters.</td></tr>`;
  $("row-count").textContent = `Showing ${found.length} of ${rows.length} tickets`;
}
function render() { const rows=filteredTickets(); renderMetrics(rows); renderVolume(rows); renderCategories(rows); renderTable(rows); }
["range-filter","priority-filter","team-filter"].forEach(id => $(id).addEventListener("change",render));
$("search-input").addEventListener("input",()=>renderTable(filteredTickets()));
$("reset-filters").addEventListener("click",()=>{ $("range-filter").value="all"; $("priority-filter").value="all"; $("team-filter").value="all"; $("search-input").value=""; render(); });
$("export-button").addEventListener("click",()=>{
  const rows=filteredTickets(), headers=["id","subject","category","priority","status","team","created","resolution_hours","sla_met"];
  const csv=[headers.join(","),...rows.map(t=>[t.id,`"${t.subject.replaceAll('"','""')}"`,t.category,t.priority,t.status,`"${t.team}"`,t.created,t.hours??"",t.sla].join(","))].join("\r\n");
  const link=document.createElement("a"); link.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); link.download="ticket-insights-filtered.csv"; link.click(); URL.revokeObjectURL(link.href);
});
render();

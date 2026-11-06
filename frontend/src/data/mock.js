export const workOrders = [
  { id: 'WO-1042', title: 'Kitchen sink leak worsening', unit: '4B · Apex Towers', category: 'Plumbing', severity: 'Critical', cost: 680, contractor: 'FlowFix Plumbing', status: 'Awaiting approval', updated: '5 min ago', ai: 'Pipe repair + pressure test · 96% match', rating: 4.9, eta: '45 min' },
  { id: 'WO-1043', title: 'AC unit not cooling', unit: '12A · Parkside', category: 'HVAC', severity: 'High', cost: 920, contractor: 'Northstar HVAC', status: 'Awaiting approval', updated: '12 min ago', ai: 'Capacitor replacement · 93% match', rating: 4.8, eta: '1 hour' },
  { id: 'WO-1038', title: 'Bedroom outlet not working', unit: '4B · Apex Towers', category: 'Electrical', severity: 'Medium', cost: 240, contractor: 'VoltPro Electric', status: 'Dispatched', updated: '24 min ago' },
  { id: 'WO-1044', title: 'Hall light flickers', unit: '3A · The Grove', category: 'Electrical', severity: 'Medium', cost: 180, contractor: 'Unassigned', status: 'Triage', updated: '40 min ago' },
  { id: 'WO-1040', title: 'Thermostat reset', unit: '11B · The Grove', category: 'HVAC', severity: 'Low', cost: 120, contractor: 'Northstar HVAC', status: 'Scheduled', updated: '55 min ago' },
  { id: 'WO-1029', title: 'Drain cleared', unit: '2D · The Grove', category: 'Plumbing', severity: 'Low', cost: 175, contractor: 'FlowFix Plumbing', status: 'Completed', updated: '1 hour ago' },
]

export const contractors = [
  { id: 1, name: 'FlowFix Plumbing', trade: 'Plumbing · Manhattan & Brooklyn', status: 'Available', rating: 4.9, jobs: 184, next: '45 min' },
  { id: 2, name: 'Northstar HVAC', trade: 'HVAC · Northeast metro', status: 'Available', rating: 4.8, jobs: 126, next: '1 hour' },
  { id: 3, name: 'VoltPro Electric', trade: 'Electrical · NYC & Newark', status: 'On a job', rating: 4.9, jobs: 163, next: '2 hours' },
  { id: 4, name: 'Metro Plumbing', trade: 'Plumbing · New York City', status: 'Available', rating: 4.7, jobs: 86, next: '60 min' },
  { id: 5, name: 'SafeLift Services', trade: 'Elevators · Northeast', status: 'Fully booked', rating: 4.8, jobs: 52, next: 'Tomorrow' },
  { id: 6, name: 'Clearview Restoration', trade: 'Water damage · Northeast', status: 'Onboarding', rating: 4.6, jobs: 31, next: 'Not verified' },
]

export const properties = [
  { id: 1, name: 'Apex Towers', address: '24 West 24th St · New York', units: 128, occupancy: '97%', open: 9, spend: '$8,420', manager: 'Maya Chen', health: 'At risk' },
  { id: 2, name: 'Parkside Residences', address: '80 Park Ave · Newark', units: 96, occupancy: '95%', open: 6, spend: '$6,180', manager: 'Alex Brooks', health: 'Needs review' },
  { id: 3, name: 'The Grove', address: '17 Grove St · Brooklyn', units: 84, occupancy: '98%', open: 4, spend: '$3,940', manager: 'Maya Chen', health: 'Healthy' },
  { id: 4, name: 'Harbor House', address: '290 River Rd · Jersey City', units: 112, occupancy: '96%', open: 1, spend: '$3,110', manager: 'Priya Shah', health: 'Healthy' },
]

export const weekly = [{ w: 'Week 1', n: 42 }, { w: 'Week 2', n: 48 }, { w: 'Week 3', n: 51 }, { w: 'Week 4', n: 47 }]
export const spend = [{ k: 'Plumbing', v: 10100 }, { k: 'HVAC', v: 8500 }, { k: 'Electrical', v: 5600 }, { k: 'Other', v: 4200 }]

export const tickets = [
  { id: 'WO-1038', title: 'Bedroom outlet not working', category: 'Electrical', status: 'Dispatched', submitted: 'Nov 4, 9:12 AM', visit: 'Today, 2:00–4:00 PM · VoltPro Electric', step: 2 },
  { id: 'WO-1042', title: 'Kitchen sink leak worsening', category: 'Plumbing', status: 'Awaiting approval', submitted: 'Today, 9:42 AM', visit: null, step: 1 },
]
export const steps = ['Submitted', 'Triage', 'Dispatched', 'Completed']
export const history = [
  { title: 'Bathroom drain cleared', date: 'Oct 21, 2026', by: 'FlowFix Plumbing', note: 'Removed blockage and tested water flow.' },
  { title: 'HVAC seasonal service', date: 'Sep 16, 2026', by: 'Northstar HVAC', note: 'Filters replaced; system tested.' },
]

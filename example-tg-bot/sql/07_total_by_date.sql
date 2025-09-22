SELECT 
    DATE(created_at) as date,
    SUM(amount) as total
FROM expenses 
GROUP BY DATE(created_at) 
ORDER BY date DESC;

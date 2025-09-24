SELECT 
    category,
    SUM(amount) as total
FROM expenses 
GROUP BY category 
ORDER BY total DESC;

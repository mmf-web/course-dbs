SELECT 
    category,
    amount,
    description,
    created_at
FROM expenses 
ORDER BY category, created_at DESC;

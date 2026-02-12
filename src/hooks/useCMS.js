import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useCMS(collectionName, options = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Build query with optional ordering and limits
        let q = collection(db, collectionName);
        
        // Only apply orderBy if specified or for collections with timestamps
        const shouldOrder = options.orderBy !== false && 
                          ['inquiries', 'projects', 'testimonials'].includes(collectionName);
        
        if (shouldOrder) {
            q = query(q, orderBy('createdAt', 'desc'));
        }
        
        // Apply limit if specified (useful for performance)
        if (options.limit) {
            q = query(q, limit(options.limit));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(items);
            setLoading(false);
        }, (err) => {
            console.error(`Error fetching ${collectionName}:`, err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, options.orderBy, options.limit]);

    return { data, loading, error };
}

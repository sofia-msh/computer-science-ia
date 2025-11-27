import React, { useEffect, useState } from "react";
import RecommendationCard from "../components/recommendation_card";
import { getRecommendation, acceptRecommendation, rejectRecommendation } from "../services/api";

export default function Home() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRec = async () => {
    setLoading(true);
    try {
      const data = await getRecommendation();
      setSong(data.song);
    } catch (e) {
      setSong(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchRec(); }, []);

  const accept = async (id) => {
    try {
      await acceptRecommendation(id);
      fetchRec();
    } catch (e) {
      fetchRec();
    }
  };
  const reject = async (id) => {
    try {
      await rejectRecommendation(id);
      fetchRec();
    } catch (e) {
      fetchRec();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <p className="mb-6">Get music recommended based on your library and genres you like.</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Recommendation</h2>
        {loading ? <div>Loading...</div> : <RecommendationCard song={song} onAccept={accept} onReject={reject} />}
      </section>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const HospitalAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalPatients: 0,
    dailyRegistrations: 0,
    activeEmergencies: 0,
    completedVisits: 0,
    averageRating: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Get total patients
      const { count: totalPatients } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });

      // Get daily registrations
      const { count: dailyRegistrations } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      // Get active emergencies
      const { count: activeEmergencies } = await supabase
        .from('emergency_patients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get completed visits
      const { count: completedVisits } = await supabase
        .from('patient_visits')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      // Get hospital ratings (simplified - would need hospital context in real app)
      const { data: hospitalData } = await supabase
        .from('hospitals')
        .select('rating, total_reviews')
        .limit(1)
        .single();

      setAnalytics({
        totalPatients: totalPatients || 0,
        dailyRegistrations: dailyRegistrations || 0,
        activeEmergencies: activeEmergencies || 0,
        completedVisits: completedVisits || 0,
        averageRating: hospitalData?.rating || 0,
        totalReviews: hospitalData?.total_reviews || 0
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "blue", badge = null }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {badge && <Badge variant="secondary">{badge}</Badge>}
            </div>
          </div>
          <Icon className={`w-8 h-8 text-${color}-500`} />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value={analytics.totalPatients}
          icon={Users}
          color="blue"
        />
        
        <StatCard
          title="Daily Registrations"
          value={analytics.dailyRegistrations}
          icon={UserPlus}
          color="green"
          badge="Today"
        />
        
        <StatCard
          title="Active Emergencies"
          value={analytics.activeEmergencies}
          icon={AlertTriangle}
          color="red"
        />
        
        <StatCard
          title="Completed Visits"
          value={analytics.completedVisits}
          icon={Activity}
          color="purple"
        />
        
        <StatCard
          title="Hospital Rating"
          value={analytics.averageRating.toFixed(1)}
          icon={TrendingUp}
          color="yellow"
          badge={`${analytics.totalReviews} reviews`}
        />
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <p>• Review emergency alerts</p>
                  <p>• Update patient records</p>
                  <p>• Generate reports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New patient registered - PAT-1234</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Visit completed for PAT-0987</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Emergency case - EM-5432</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <Badge variant="default">95%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Wait Time</span>
                <Badge variant="secondary">12 min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Emergency Response</span>
                <Badge variant="default">3 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalAnalytics;

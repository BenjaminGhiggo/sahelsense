import React, { lazy, Suspense } from 'react';
const Plot = lazy(() => import('react-plotly.js'));

interface LazyPlotProps {
  data: any[];
  layout: any;
  config?: any;
}

const LazyPlot: React.FC<LazyPlotProps> = ({ data, layout, config }) => {
  return (
    <Suspense fallback={<div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
    </div>}>
      <Plot
        data={data}
        layout={layout}
        config={config}
        useResizeHandler
        className="w-full"
      />
    </Suspense>
  );
};

export default LazyPlot;
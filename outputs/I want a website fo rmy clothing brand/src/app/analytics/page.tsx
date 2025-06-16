<div class="p-4">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3 xl:w-1/4 p-2">
      <div class="bg-white border border-gray-200 rounded-lg shadow p-4">
        <h2 class="text-lg text-gray-800 font-bold mb-2">Chart 1</h2>
        <div class="h-48">
          {/* Replace with Chart.js or Recharts code */}
          <bar-chart />
        </div>
      </div>
    </div>
    <!-- Repeat for other charts -->
  </div>
</div>

<script setup>
import { BarChart } from 'recharts';
</script>
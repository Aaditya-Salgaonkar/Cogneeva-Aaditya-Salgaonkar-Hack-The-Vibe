<div class="container mx-auto px-4 py-16" *ngIf="projects">
  <h1 class="text-4xl font-bold text-center mb-12">Your Projects</h1>
  <div class="flex flex-wrap">
    <div
      *ngFor="let project of projects"
      class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
    >
      <div class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
        <div class="p-8 text-3xl font-bold text-center border-b-4">{{ project.name }}</div>
        <ul class="w-full text-center text-sm">
          <li class="border-b py-4">Description: {{ project.description }}</li>
          <li class="border-b py-4">Created At: {{ project.createdAt }}</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<ng-container *ngIf="!projects">
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-center mb-12">You don't have any projects.</h1>
  </div>
</ng-container>
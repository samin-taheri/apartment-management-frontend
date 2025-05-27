<h1>Apartment Management System</h1>
<p>
  The Apartment Management System is a comprehensive web application that enables administrators and residents to manage flat assignments, monthly dues, announcements, and expenses in a secure and user-friendly environment. Built with Angular and Spring Boot, the platform features JWT authentication, role-based access control, financial dashboards, and real-time updates.
</p>

<hr>

<h2>1. Authentication & Role Management</h2>

<h3>Login System</h3>
<ul>
  <li>Supports two roles: <strong>ADMIN</strong> and <strong>USER</strong>.</li>
  <li>Users must enter a valid username, password, and select their correct role during login.</li>
  <li>If the selected role doesn't match their account's actual role, login is denied with an error message.</li>
  <li>On successful login:
    <ul>
      <li>A JWT token is generated and saved in <code>localStorage</code>.</li>
      <li>User data (username, role) is stored for session and permission control.</li>
      <li>Redirection:
        <ul>
          <li><code>/dashboard</code> for admins</li>
          <li><code>/user-dashboard</code> for regular users</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<img src="https://github.com/user-attachments/assets/bdb9c225-78e8-4ad7-aa37-e33c265bfd97" alt="Login Screenshot" width="500"/>
<img src="https://github.com/user-attachments/assets/97b583a1-959c-4ce2-965f-244a4c0f3f86" alt="Login Screenshot" width="500" />

<h3>Logout</h3>
<ul>
  <li>Clears all session data: JWT token, username, role.</li>
  <li>Redirects user to the login screen.</li>
</ul>

<hr>

<h2>2. Flat Management</h2>

<h3>Create Flat (Admin Only)</h3>
<ul>
  <li>Admins can create flats using a form with fields like:
    <ul>
      <li>Flat Name</li>
      <li>Flat Type (e.g., Studio, 1BHK)</li>
      <li>Facilities (multi-select)</li>
      <li>Furnished Status</li>
      <li>Address (City, Street)</li>
      <li>Assigned User (dropdown)</li>
    </ul>
  </li>
  <li>All fields are validated, and facilities must include at least one item.</li>
</ul>
<img src="https://github.com/user-attachments/assets/c2a26c45-22fa-44c7-844a-39534d47bd1e" alt="Create Flat Form" width="500"/>
<img src="https://github.com/user-attachments/assets/95861daa-e214-4670-8ed5-5e6bc26cae80" alt="Browse Flats" width="500"/>

<h3>Browse Flats</h3>
<ul>
  <li>Admins can view all registered flats in a list.</li>
</ul>

<img src="https://github.com/user-attachments/assets/c6a2a52e-4f4d-40c8-9f41-40829fcd9ae0" alt="Flat Detail" width="500"/>

<h3>Flat Details</h3>
<ul>
  <li>Admins can access full flat data from route <code>/flat/:id</code>.</li>
  <li>Details include ownership info, payment history, and facility breakdown.</li>
  <li>Edit and delete options are available for each flat.</li>
</ul>

<img src="https://github.com/user-attachments/assets/32bf58e7-4183-4dd5-a909-de55309d5fb2" alt="Flat Info View" width="500"/>

<img src="https://github.com/user-attachments/assets/db72e21b-40d6-4039-bc23-6e5ba57cc747" alt="Create Flat Details Preview" width="500"/>

<hr>

<h2>3. Payment & Dues Management</h2>

<h3>Debtor Flats</h3>
<ul>
  <li>Admin can view a list of all flats with paid and unpaid dues.</li>
  <li>Filters allow toggling between all, paid, and unpaid payments.</li>
</ul>

<h3>Accept Payment</h3>
<ul>
  <li>Admins can mark payments as paid via a single click.</li>
  <li>The backend toggles the <code>paid</code> flag and logs the timestamp.</li>
</ul>

<img src="https://github.com/user-attachments/assets/2248963d-6aa5-4961-81e9-ed0aea7f92f4" alt="Debtor Flats" width="500"/>
<img src="https://github.com/user-attachments/assets/6b686e6c-80ba-4393-8c52-5b3fdb115bc5" alt="Debtors List" width="500"/>

<h3>User Payments</h3>
<ul>
  <li>Each user can view all payments related to their assigned flat(s).</li>
  <li>Status is clearly shown with color-coded badges (e.g., red for unpaid, green for paid).</li>
</ul>
<img src="https://github.com/user-attachments/assets/77d74889-6c9c-4040-b40b-53df033924dc" alt="User Payments" width="500"/>

<h3>Generate Monthly Dues</h3>
<ul>
  <li>Admins can auto-generate dues for all users based on flat info.</li>
  <li>Due amounts and dates are applied programmatically.</li>
</ul>
<img src="https://github.com/user-attachments/assets/d4d29a14-1289-40b1-b83a-274f758b501d" alt="Generate Dues" width="500"/>

<h3>Add Manual Payment</h3>
<ul>
  <li>Admins can create a new payment manually by selecting flat, amount, and due date.</li>
  <li>User assignment is handled in the backend.</li>
</ul>
<img src="https://github.com/user-attachments/assets/eea988cc-333d-4937-9649-6f145c6fde3d" alt="Add Payment" width="500"/>

<hr>

<h2>4. Expense Management</h2>

<h3>Record Expense</h3>
<ul>
  <li>Admins can record expenses like utilities or repairs.</li>
  <li>Form includes:
    <ul>
      <li>Title (required)</li>
      <li>Amount (must be > 0)</li>
      <li>Note (optional)</li>
      <li>Date (defaults to today)</li>
    </ul>
  </li>
</ul>
<img src="https://github.com/user-attachments/assets/86021a05-5756-4af9-b0a3-0b3521c4a8c1" alt="Expense Entry" width="500" />

<h3>Expense Table & Financial Summary</h3>
<ul>
  <li>Table displays: Category, Amount, Note, and Date.</li>
  <li>Auto-formatted date and responsive layout.</li>
  <li>A bar chart compares income from dues vs. total expenses using Chart.js.</li>
</ul>

<img src="https://github.com/user-attachments/assets/463d89ec-adcc-4c9c-aa83-096c3522eae5" alt="Financial Chart" width="500" />

<img src="https://github.com/user-attachments/assets/8823e12d-bde1-4d09-9c64-7de66e919b4a" alt="Financial Chart" width="500" />

<hr>

<h2>5. Announcements</h2>

<h3>Admin Announcements</h3>
<ul>
  <li>Admins can create announcements via a dedicated form with validation.</li>
  <li>Used for notices like repairs, meetings, or updates.</li>
</ul>

<img src="https://github.com/user-attachments/assets/bb177596-f3db-40c5-b044-c3354c3161cd" alt="Add Announcement" width="500" />

<h3>User View</h3>
<ul>
  <li>Users can view all published announcements in read-only mode.</li>
  <li>Feeds are auto-updated in real-time.</li>
</ul>

<img src="https://github.com/user-attachments/assets/4667aa68-928b-47d1-b567-687bdf64edb3" alt="Announcement Feed" width="500"/>

<hr>

<h2>6. Profile Management</h2>

<h3>User Profile Popup</h3>
<ul>
  <li>Accessible via the header profile icon.</li>
  <li>Displays: username, role, email, phone, Flat, and door number.</li>
  <li>Data is fetched dynamically after login.</li>
</ul>
<img src="https://github.com/user-attachments/assets/cc45e124-845f-477a-8910-bb14415c14fa" alt="Profile Popup" width="344"/>

<hr>

<h2>7. Admin & User Management</h2>

<h3>View All Users</h3>
<ul>
  <li>Admins can view a list of users with full details:
    <ul>
      <li>Username</li>
      <li>Email</li>
      <li>Phone</li>
      <li>Block & Door Number</li>
      <li>Role</li>
    </ul>
  </li>
</ul>
<img src="https://github.com/user-attachments/assets/89790786-2fb1-40b3-8ec9-e3accc7e1291" alt="Users Table" width="500"/>
<img src="https://github.com/user-attachments/assets/f3a5cdd2-e3b3-4868-b769-932a19084321" alt="Users Table" width="500" />


<h3>Create New User/Admin</h3>
<ul>
  <li>Admins can create users with validations for all required fields.</li>
  <li>Passwords are encrypted using <code>BCrypt</code>.</li>
</ul>

<img src="https://github.com/user-attachments/assets/0578ac80-5c11-4e71-9f4d-3fdaba4205c7" alt="Delete User" width="500"/>
<img src="https://github.com/user-attachments/assets/52200d0c-509a-47bf-9e4e-3db6d17303de" alt="Delete User" width="500" />


<h3>Delete Users</h3>
<ul>
  <li>Admins can remove users.</li>
  <li>Deletions require confirmation and auto-unlink flats.</li>
</ul>

<hr>

<h2>8. Security & Unauthorized Access</h2>
<ul>
  <li>All frontend routes are protected with role checks.</li>
  <li>Invalid access redirects to a 401 Unauthorized page.</li>
  <li>JWT tokens are auto-invalidated on expiration.</li>
  <li>Backend validates every token and enforces permissions.</li>
</ul>
<img src="https://github.com/user-attachments/assets/ed5e75b5-f37d-491c-8f59-fa2689978cc7" alt="Unauthorized Page" width="500"/>

<hr>

<h3>Tech Stack</h3>
<ul>
  <li><strong>Frontend:</strong> Angular</li>
  <li><strong>Backend:</strong> Spring Boot (REST APIs + JWT)</li>
  <li><strong>Database:</strong> MySQL</li>
  <li><strong>Charting:</strong> Chart.js</li>
</ul>

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

/**
 * Get the authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

/**
 * Make an authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken()
  const url = `${API_BASE_URL}${endpoint}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Create a new patient
 */
export interface CreatePatientRequest {
  full_name: string
  age?: number
  date_of_birth?: string
  gender: string
  condition?: string
  notes?: string
  emergency_contact?: string
}

export interface CreatePatientResponse {
  patient_id: number
  health_id: string
  qr_code_url: string | null
}

export async function createPatient(
  data: CreatePatientRequest
): Promise<CreatePatientResponse> {
  return apiRequest<CreatePatientResponse>("/doctor/create-patient/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * Patient Profile APIs
 */
export interface PatientProfile {
  id: number
  health_id: string
  emergency_contact: string | null
}

export async function getPatientProfile(): Promise<PatientProfile> {
  return apiRequest<PatientProfile>("/patient/profile/")
}

export async function updatePatientProfile(
  emergency_contact: string
): Promise<PatientProfile> {
  const formData = new FormData()
  formData.append("emergency_contact", emergency_contact)

  const token = getAuthToken()
  const url = `${API_BASE_URL}/patient/profile/`
  const headers: HeadersInit = {}

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

export interface PatientQRCode {
  qr_code_url: string | null
}

export async function getPatientQRCode(): Promise<PatientQRCode> {
  return apiRequest<PatientQRCode>("/patient/qr-code/")
}

/**
 * Patient Visits
 */
export interface Visit {
  id: number
  summary: string
  diagnosis: string | null
  cardano_hash: string | null
}

export async function getPatientVisits(): Promise<Visit[]> {
  return apiRequest<Visit[]>("/patient/visits/")
}

/**
 * Patient Medications
 */
export interface Medication {
  id: number
  drug_name: string
  dosage: string
  duration: string | null
  verified: boolean
}

export async function getPatientMedications(): Promise<Medication[]> {
  return apiRequest<Medication[]>("/patient/medications/")
}

/**
 * Patient Lab Results
 */
export interface LabResult {
  id: number
  summary: string | null
  date: string
}

export async function getPatientLabResults(): Promise<LabResult[]> {
  return apiRequest<LabResult[]>("/patient/lab-results/")
}

/**
 * Get current user info (from auth context or localStorage)
 */
export interface UserInfo {
  id: number
  username: string
  email: string
  full_name: string
  phone: string | null
  role: string
}

export function getCurrentUser(): UserInfo | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

/**
 * Hospital APIs
 * Note: Some endpoints may need to be created in the backend
 */

export interface Doctor {
  id: number
  name: string
  email: string
  specialization: string
  hospital: string
  care_points_balance?: number
  records_created?: number
}

export interface HospitalPatientRecord {
  id: number
  patient_id: number
  health_id: string
  patient_name: string
  created_by_doctor: string
  created_at: string
  visit_summary?: string
  diagnosis?: string
  cardano_hash?: string
}

/**
 * Get all doctors in a hospital
 */
export async function getHospitalDoctors(hospitalName?: string): Promise<Doctor[]> {
  return apiRequest<Doctor[]>("/hospital/doctors/")
}

/**
 * Get all patient records created by doctors in a hospital
 */
export async function getHospitalPatientRecords(hospitalName?: string): Promise<HospitalPatientRecord[]> {
  return apiRequest<HospitalPatientRecord[]>("/hospital/patient-records/")
}

/**
 * Get hospital statistics
 */
export interface HospitalStats {
  total_doctors: number
  total_patient_records: number
  total_patients: number
  total_care_points: number
  hospital_code?: string
}

export async function getHospitalStats(): Promise<HospitalStats> {
  return apiRequest<HospitalStats>("/hospital/stats/")
}

/**
 * Doctor APIs
 */

export interface DoctorPatient {
  id: number
  health_id: string
  full_name: string
  created_at: string | null
}

export interface CarePointsData {
  balance: number
  current_streak: number
  last_record_date: string | null
}

export interface CarePointsTransaction {
  id: number
  amount: number
  description: string
  transaction_type: string
  cardano_tx_hash: string | null
  created_at: string
}

export interface PatientSummary {
  id: number
  full_name: string | null
  health_id: string
  emergency_contact: string | null
  visits_count: number
  medications_count: number
  lab_results_count: number
}

/**
 * Get all patients created by the logged-in doctor
 */
export async function getDoctorPatients(): Promise<DoctorPatient[]> {
  return apiRequest<DoctorPatient[]>("/doctor/patients/")
}

/**
 * Get doctor's CarePoints balance and streak
 */
export async function getDoctorCarePoints(): Promise<CarePointsData> {
  return apiRequest<CarePointsData>("/doctor/care-points/")
}

/**
 * Get CarePoints transaction history
 */
export async function getCarePointsTransactions(): Promise<CarePointsTransaction[]> {
  return apiRequest<CarePointsTransaction[]>("/doctor/care-points/transactions/")
}

/**
 * Scan patient by health ID
 */
export async function scanPatient(health_id: string): Promise<PatientSummary> {
  return apiRequest<PatientSummary>("/doctor/scan/", {
    method: "POST",
    body: JSON.stringify({ health_id }),
  })
}

/**
 * Decode QR code and fetch patient record
 */
export interface QRDecodeRequest {
  patient_id?: number
  health_id?: string
  record_hash?: string
  tx_hash?: string
}

export interface QRDecodeResponse {
  patient_id: number
  health_id: string
  full_name: string
  record_data: any
  ipfs_hash: string | null
  cardano_tx_hash: string | null
  cardano_record_hash: string | null
}

export async function decodeQRCode(data: QRDecodeRequest): Promise<QRDecodeResponse> {
  return apiRequest<QRDecodeResponse>("/doctor/decode-qr/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * User Profile APIs (for doctor account page)
 */
export interface UserProfile {
  id: number
  full_name: string
  phone: string | null
  national_id: string | null
  email: string
  role: string
  language: string
  elder_mode: boolean
}

export interface UpdateProfileRequest {
  language?: string
  elder_mode?: boolean
}

// Auth APIs
export interface SimpleAuthResponse {
  success: boolean
  message: string
  access?: string
  refresh?: string
}

export interface SignupRequest {
  full_name?: string
  phone?: string
  national_id?: string
  email?: string
  password: string
  role?: string
}

export interface LoginRequest {
  email?: string
  phone?: string
  national_id?: string
  password: string
}

export async function loginUser(data: LoginRequest): Promise<SimpleAuthResponse> {
  return apiRequest<SimpleAuthResponse>("/users/login/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function signupUser(data: SignupRequest): Promise<SimpleAuthResponse> {
  const formData = new FormData()
  if (data.full_name) formData.append("full_name", data.full_name)
  if (data.phone) formData.append("phone", data.phone)
  if (data.national_id) formData.append("national_id", data.national_id)
  if (data.email) formData.append("email", data.email)
  formData.append("password", data.password)
  if (data.role) formData.append("role", data.role)

  // Auth token not needed for signup?
  // getAuthToken() is handled inside apiRequest but we might want to override headers for FormData?
  // apiRequest sets Content-Type to application/json by default.
  // We need to bypass that for FormData to let browser set boundary.

  const url = `${API_BASE_URL}/users/signup/`
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

export async function getUserProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/users/profile/")
}

export async function updateUserProfile(data: UpdateProfileRequest): Promise<{ success: boolean; message: string }> {
  return apiRequest<{ success: boolean; message: string }>("/users/profile/update/", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

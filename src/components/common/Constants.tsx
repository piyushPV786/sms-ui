export const DARK_GRAY = '#4f4f4f'
export const ORANGE = '#dd6d0b'
export const BLUE = '#0070c0'
export const OLIVE_GREEN = '#548235'
export const DARK_YELLOW = '#7a6e00'
export const RED = '#ff0000'
export const NAVY_BLUE = '#203764'
export const STEEL_TEAL = '#4F958E'
export const GREEN = '#548235'

export const routePaths: any = {
  Application_Form: '/student-registration-form/application-form',
  Payment_Success: '/payment/document-success',
  Document_Success: '/payment/document-upload-success',
  Document_Save_Success: '/payment/document-save-success',
  APPLICATION_ENROLLED_SUCCESS: '/payment/application-enrolled-success',
  Dashboard: '/dashboard',
  StudentDashboard: '/dashboard',
  RMATView: '/rmat'
}

export const responseStatus: any = {
  successCode: 200,
  successCodeOne: 201,
  unauthorizedStatus: 401
}

export const accountDetails = {
  AccountName: 'Regenesys Business School',
  AccountNumber: '1172349479',
  BranchCode: '198765',
  BankName: 'Nedbank',
  AccountType: 'Cheque Account'
}
export const applicationStatus = {
  graduated: 'GRADUATED'
}
export const APPLICATION_STATUS = {
  SAVED_AS_DRAFT: 'APP-DRAFT',
  APPLICATION_FEE_PENDING: 'APP-FEE-PEND',
  APPLICATION_FEE_VERIFICATION_PENDING: 'APP-FEE-VER-PEND',
  RESUBMIT_APPLICATION_FEE_PROOF: 'RESUB-APP-FEE-PROOF',
  APPLICATION_FEE_ACCEPTED: 'APP-FEE-ACCEPTED',
  ENROLLED_TO_APPLICATION: 'APP-ENROLLED',
  UPLOAD_APPLICATION_DOCUMENTS: 'UPLD-APP-DOC',
  APPLICATION_DOCUMENTS_UPLOADED: 'APP-DOC-UPLOADED',
  APPLICATION_DOCUMENT_VERIFICATION_PENDING: 'APP-DOC-VER-PEND',
  RESUBMIT_APPLICATION_DOCUMENTS: 'RESUB-APP-DOC',
  APPLICATION_DOCUMENTS_ACCEPTED: 'APP-DOC-ACCEPTED',
  RMAT_PENDING: 'RMAT-PEND',
  RMAT_PASS: 'RMAT-PASS',
  RMAT_FAIL: 'RMAT-FAIL',
  ENROLMENT_ACCEPTED: 'ENRL-ACCEPTED',
  INTAKE_ASSIGNMENT_PENDING: 'INTAKE-ASSIGNMENT-PEND',
  PROGRAM_FEES_PENDING: 'PROG-FEE-PEND',
  REQUEST_FOR_BURSARY: 'BURSARY-REQUESTED',
  UPLOAD_BURSARY_DOCUMENTS: 'BURSARY-PEND',
  BURSARY_DOCUMENTS_UPLOADED: 'BURSARY-DOC-UPLOADED',
  RESUBMIT_BURSARY_DOCUMENTS: 'RESUB-BURSARY-DOC',
  BURSARY_DOCUMENTS_ACCEPTED: 'BURSARY-DOC-ACCEPTED',
  BURSARY_CONFIRMATION_PENDING: 'BURSARY-PEND',
  BURSARY_APPROVED: 'BURSARY-APPROVED',
  BURSARY_REJECTED: 'BURSARY-REJECTED',
  REQUEST_FOR_LOAN: 'LOAN-REQUESTED',
  UPLOAD_LOAN_DOCUMENTS: 'UPLD-LOAN-DOC',
  LOAN_DOCUMENTS_UPLOADED: 'LOAN-DOC-UPLOADED',
  RESUBMIT_LOAN_DOCUMENTS: 'RESUB-LOAN-DOC',
  LOAN_DOCUMENTS_ACCEPTED: 'LOAN-DOC-ACCEPTED',
  LOAN_CONFIRMATION_PENDING: 'LOAN-PEND',
  LOAN_APPROVED: 'LOAN-APPROVED',
  LOAN_REJECTED: 'LOAN-REJECTED',
  PROGRAM_FEES_VERIFICATION_PENDING: 'PROG-FEE-VER-PEND',
  RESUBMIT_PROGRAM_FEE_PROOF: 'RESUB-PROG-FEE-PROOF',
  PROGRAM_FEE_ACCEPTED: 'PROG-FEE-ACCEPTED',
  ADMITTED_TO_PROGRAM: 'INTAKE-ASSIGNMENT PENDING',
  INTAKE_ASSIGNED: 'INTAKE-ASSIGNED',
  ENROLLED_BY_ADMISSION: 'PROG-ADMITTED/ENROLLED',
  MONTHLY_PAYMENT_REJECT: 'MONTHLY_PAYMENT_REJECTED',
  BURSARY_APP_FEE_PEND: 'BURSARY-APP-FEE-PEND'
}

export enum CommonEnums {
  TRUE = 'true',
  TOTAL = 'TOTAL',
  NEW_STATUS = 'New-Application',
  DRAFT_STATUS = 'APP-DRAFT',
  FEES_PENDING_STATUS = 'APP-FEE-PEND',
  APP_ENROLLED_STATUS = 'APP-ENROLLED',
  APP_ENROLLED_ACCEPTED = 'ENRL-ACCEPTED',
  RESUB_APP_FEE_PROOF = 'RESUB-APP-FEE-PROOF',
  APP_FEE_DOC_VER_PEND = 'APP-FEE-DOC-VER-PEND',
  APP_FEE_VER_PEND = 'APP-FEE-VER-PEND',
  RESUB_APP_DOC = 'RESUB-APP-DOC',
  APP_FEE_ACCEPTED = 'APP-FEE-ACCEPTED',
  RMAT_PENDING = 'RMAT-PENDING',
  MANAGEMENT = 'management',
  BURSARY = 'BURSARY',
  EMPLOYEE_BURSARY = 'EMPBURSARY',
  REGULAR = 'regular',
  GUARDIAN = 'guardian',
  SOUTH_AFRICA_CURRENCY = 'RAND',
  DOCUMENT = 'Document',
  PROG_ADMITTED = 'PROG-ADMITTED',
  ACCEPTANCE_LETTER = 'ACCEPTANCE-LETTER',
  CONFIRMATION_LETTER = 'CONFIRMATION-LETTER',
  WELCOME_LETTER = 'WELCOME-LETTER',
  QUOTE = 'QUOTE',
  BURSARY_LETTER_PEND = 'BURSARY-LETTER-PEND',
  RESUB_BURSARY_DOC = 'RESUB-BURSARY-DOC',
  MONTHLY_PAYMENT_REJECT = 'MONTHLY_PAYMENT_REJECTED',
  UPLD_BURSARY_DOC = 'UPLD-BURSARY-DOC'
}
export interface IDynamicObject {
  [key: string]: any
}

export const studentApplicationAllStatus: IDynamicObject = {
  'APP-FEE-DOC-VER-PEND': 'Application Fee Verification Pending',
  'RESUB-APP-FEE-PROOF': 'Resubmit Application Fee POP',
  'APP-FEE-VER-PEND': 'Application Fee POP Verification Pending',
  'APP-FEE-ACCEPTED': 'Application Fee Accepted',
  'APP-FEE-REJECTED': 'Application Fee Rejected',
  'APP-ENROLLED': 'Application Confirmed',
  'APP-DOC-VER-PEND': 'Application Document Verification Pending',
  'APP-DOC-REQUESTED': 'Application Documents Requested',
  'APP-DOC-ACCEPTED': 'Application Documents Accepted',
  'RMAT-PEND': 'RMAT Pending',
  'RMAT-PASS': 'RMAT Pass',
  'RMAT-FAIL': 'RMAT Fail',
  'ENRL-ACCEPTED': 'Application Accepted',
  'PROG-FEE-PEND': 'Qualification Fee Pending',
  'BURSARY-REQUESTED': 'Request for Bursary',
  'BURSARY-DOC-VER-PEND': 'Bursary Document Verification Pending',
  'BURSARY-DOC-REQUESTED': 'Bursary Documents Requested',
  'BURSARY-PEND': 'Bursary Confirmation Pending',
  'BURSARY-APPROVED': 'Bursary Approved',
  'BURSARY-REJECTED': 'Bursary Rejected',
  'LOAN-REQUESTED': 'Request for Loan',
  'LOAN-DOC-VER-PEND': 'Loan Document Verification Pending',
  'LOAN-DOC-REQUESTED': 'Loan Documents Requested',
  'LOAN-PEND': 'Loan Confirmation Pending',
  'LOAN-APPROVED': 'Loan Approved',
  'LOAN-REJECTED': 'Loan Rejected',
  'PROG-FEE-DOC-VER-PEND': 'Qualification Fees Document Verification Pending',
  'RESUB-PROG-FEE-PROOF': 'Resubmit Program Fee POP',
  'PROG-FEE-VER-PEND': 'Program Fees Verification Pending',
  'DEBIT-ORDER-FORM-PEND': 'Debit Order Form Pending',
  'DEBIT-ORDER-FORM-DOC-VER-PEND': 'Debit Order Form Document Verification Pending',
  'DEBIT-ORDER-FORM-VER-PEND': 'Debit Order Form Verification Pending',
  'DEBIT-ORDER-FORM-ACCEPTED': 'Debit Order Form Accepted',
  'RESUB-DEBIT-ORDER-FORM': 'Resubmit Debit Order Form',
  'EFT-LETTER-PEND': 'EFT Letter Pending',
  'EFT-LETTER-DOC-VER-PEND': 'EFT Letter Document Verification Pending',
  'EFT-LETTER-VER-PEND': 'EFT Letter Verification Pending',
  'EFT-LETTER-ACCEPTED': 'EFT Letter Accepted',
  'RESUB-EFT-LETTER': 'Resubmit EFT Letter',
  'PROG-FEE-ACCEPTED': 'Qualification Fee Accepted',
  'INTAKE-ASSIGNMENT-PEND': 'Intake Assignment Pending',
  'INTAKE-ASSIGNED': 'Intake Assigned',
  'PROG-ADMITTED': 'Enrolled to the Program',
  ENROLLED: 'Enrolled to the Program',
  'APP-DRAFT': 'In Draft',
  'APP-FEE-PEND': 'Application  Fee Pending',
  'UPLD-APP-DOC': 'Upload Application documents',
  'APP-DOC-UPLOADED': 'Application documents Uploaded',
  'RESUB-APP-DOC': 'Resubmit Application Documents',
  'UPLD-BURSARY-DOC': 'Upload Bursary Documents',
  'BURSARY-DOC-UPLOADED': 'Bursary Document Uploaded',
  'RESUB-BURSARY-DOC': 'Resubmit Bursary Documents',
  'BURSARY-DOC-ACCEPTED': 'Bursary Documents Accepted',
  'UPLD-LOAN-DOC': 'Upload Loan Documents',
  'LOAN-DOC-UPLOADED': 'Loan Document Uploaded',
  'RESUB-LOAN-DOC': 'Resubmit Loan Documents',
  'LOAN-DOC-ACCEPTED': 'Loan Documents Accepted',
  'INTAKE-ASSIGNMENT PENDING': 'Intake Assignment Pending',
  'BURSARY-LETTER-PEND': 'Upload Bursary Documents',
  'RMAT-PENDING': 'RMAT Exam is Pending',
  'INTAKE-ASSIGNMENT-PENDING': 'Intake Assignment Pending',
  'FINANCE-VERIFICATION-PEND': 'Finance Verification Pending',
  MONTHLY_PAYMENT_REJECTED: 'Monthly Payment Rejected'
}

export const UPLOAD_DOCUMENT_BUTTON_STATUS = [
  APPLICATION_STATUS.APPLICATION_FEE_VERIFICATION_PENDING,
  APPLICATION_STATUS.RESUBMIT_APPLICATION_FEE_PROOF,
  APPLICATION_STATUS.ENROLLED_TO_APPLICATION,
  APPLICATION_STATUS.APPLICATION_FEE_PENDING,
  APPLICATION_STATUS.UPLOAD_BURSARY_DOCUMENTS,
  APPLICATION_STATUS.RESUBMIT_APPLICATION_DOCUMENTS,
  APPLICATION_STATUS?.BURSARY_APP_FEE_PEND
]

export const BURSARY_BUTTON_STATUS = [
  CommonEnums.BURSARY_LETTER_PEND,
  CommonEnums.RESUB_BURSARY_DOC,
  CommonEnums.UPLD_BURSARY_DOC
]

export const FeeModeCode = {
  APPLICATION: 'APPLICATION'
}

export enum feeMode {
  APPLICATION = 'APPLICATION',
  TOTAL = 'TOTAL',
  MONTHLY = 'MONTHLY'
}
export const applicationFeesStatus = ['APP-FEE-PEND', 'RESUB-APP-FEE-PROOF']

export enum ErrorMessage {
  discountErrorMessage = 'Discount Code Not Applicable'
}

export enum SuccessMessage {
  discountSuccessMessage = 'Discount Applied Successfully With Discount Percentage '
}

export const MBACode = 'MBA-Prog'

export const statusColor: any = {
  PENDING: { text: '#af7300', background: '#fcefd0' },
  SALES_APPROVED: { text: '#008554', background: '#eefbe5' },
  ADMISSION_APPROVED: { text: '#008554', background: '#eefbe5' },
  REJECT: { text: '#af7300', background: '#fcefd0' },
  UPLOADPENDING: { text: '#af7300', background: '#fcefd0' },
  UPLOADED: { text: '#af7300', background: '#fcefd0' },
  SALES_REJECT: { text: '#ff281b', background: '#ffe9e9' },
  ADMISSION_REJECT: { text: '#ff281b', background: '#ffe9e9' }
}

export const customStatus = {
  UPLOADPENDING: 'UPLOADPENDING',
  UPLOADED: 'UPLOADED',
  EDFORALLCONTRACT: 'EDFORALLCONTRACT'
}

export const status: any = {
  PENDING: 'Approval Pending',
  SALES_APPROVED: 'Sales Approved',
  ADMISSION_APPROVED: 'Admission Approved',
  REJECT: 'Document Rejected',
  UPLOADPENDING: 'Upload Pending',
  UPLOADED: 'Uploaded',
  SALES_REJECT: 'Sales Rejected',
  ADMISSION_REJECT: 'Admission Rejected'
}

export const docType = {
  RESUMECV: 'RESUMECV',
  MATRIC: 'MATRIC',
  HIGHESTQUALIFICATION: 'HIGHESTQUALIFICATION',
  BURSARYLETTER: 'BURSARYLETTER',
  DECLARATIONFORM: 'DECLARATIONFORM',
  MOTIVATIONLETTER: 'MOTIVATIONLETTER',
  INTERVIEWNOTES: 'INTERVIEWNOTES'
}

export const docRejectStatus = ['SALES_REJECT', 'ADMISSION_REJECT']

export const CertifiedDocument = ['MATRIC', 'IDPASSPORT', 'HIGHESTQUALIFICATION']
export const disableStatus = ['SALES_APPROVED', 'ADMISSION_APPROVED']

export const acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']

export const mbaDocs = ['MOTIVATIONLETTER']

export const nonMandatoryDocuments = [
  'TERMS&CONDITION',
  'APPLICATIONLETTER',
  'MATRIC',
  'OTHERS',
  'INTERVIEWNOTES',
  'EDFORALLCONTRACT'
]

export const bursarryFeilds = {
  Name: 'BURSARYLETTERName',
  Email: 'BURSARYLETTEREmail',
  Phone: 'BURSARYLETTERPhone'
}

export const dashboardRedirectStatus = [
  CommonEnums?.RESUB_APP_DOC,
  CommonEnums?.BURSARY_LETTER_PEND,
  CommonEnums?.RESUB_BURSARY_DOC
]

export enum DocumentStatus {
  UploadPending = 'upload pending',
  Approved = 'approved',
  Submitted = 'submitted',
  Rejected = 'rejected',
  Pending = 'PENDING'
}

export const allowedPaymentStatus = ['APP-FEE-PEND', 'ENRL-ACCEPTED', 'PROG-FEE-PEND']

export const RoutePaths = {
  StudentDashboard: '/dashboard',
  RMATView: '/rmat'
}

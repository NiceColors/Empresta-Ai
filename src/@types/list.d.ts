type User = {
    email?: string;
    name?: string;
    permissions?: string[];
    role?: 'MANAGER' | 'INTERN';
}

interface IUserProps {
    role: 'INTERN' | 'MANAGER';
    id: string;
    name: string;
    email: string;
    cpf: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
}

interface IClientProps {
    id: number;
    name: string;
    cpf: string;
    birthdate: Date | string;
    created_at: string;
    updated_at: string;
}


interface IBookDetailsProps {
    id?: string;
    title: string;
    author: string;
    pages?: number
    loanId?: string
    publisher: string;
    status: boolean;
    loanRate?: number;
    synopsis?: string;
    bannerUrl?: string;
    releaseYear: Date | string;
    createdAt?: Date | string;
}

interface ILoanProps {
    id: string;
    employeeName: string;
    employeeId: string;
    clientName: string;
    clientId: string;
    bookTitle: string;
    bookId: string;
    loanRateValue?: number;
    status: boolean;
    startDate: Date | string;
    endDate: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

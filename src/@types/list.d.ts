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
    birthdate: strig | date;
    created_at: string;
    updated_at: string;
}


interface IBookDetailsProps {
    id?: string;
    title: string;
    author: string;
    pages?: number
    publisher: string;
    status: boolean;
    loanRate?: number;
    synopsis?: string;
    bannerUrl?: string;
    releaseYear: Date;
    createdAt?: Date;
}

#include <iostream>
#include <string>
using namespace std;
struct Student {
    long long id;
    string name;
    double grade;
};
void showStudent(Student* ptr) {
    cout << "Isim: " << ptr->name << endl;
    cout << "ID: " << ptr->id << endl;
    cout << "Not: " << ptr->grade << endl;
}
void showStudents(Student* students, int size) {
    for (int i = 0; i < size; i++) {
        cout << "ID: " << students[i].id << endl;
        cout << "Isim: " << students[i].name << endl;
        cout << "Not: " << students[i].grade << endl;
    }
}
void updateGrade(Student* student, double newGrade) {
    student->grade = newGrade;
}
double calculateAverage(Student* students, int size) {
    double total = 0;
    for (int i = 0; i < size; i++) {
        total += students[i].grade;
    }
    return total / size;
}
Student* findStudent(Student* students, int size, long long id) {
    for (int i = 0; i < size; i++) {
        if (students[i].id == id) {
            return &students[i];
        }
    }
    return nullptr;
}

int main() {
    
    Student students[5];

    students[0].name = "Ali Ozturk";
    students[0].id = 2345678092;
    students[0].grade = 91;

    students[1].name = "Ayse Demir";
    students[1].id = 6342891034;
    students[1].grade = 67;

    students[2].name = "Mustafa Kaya";
    students[2].id = 6342854661;
    students[2].grade = 88;

    students[3].name = "Ali Kaya";
    students[3].id = 6342854621;
    students[3].grade = 100;

    students[4].name = "Sevde Altuntas";
    students[4].id = 6342854999;
    students[4].grade = 78;

    showStudents(students, 5);
   

    
    int choice;
    long long id;
    Student* result;
    
   
   
    do {
        cout << "\n--- MENU ---\n";
        cout << "1 - Ogrencileri Listele\n";
        cout << "2 - Ogrenci Ara\n";
        cout << "3 - Not Guncelle\n";
        cout << "4 - Ortalamayi Hesapla\n";
        cout << "0 - Cikis\n";
        cout << "Seciminiz: ";
        cin >> choice;
        if (cin.fail()) {
            cin.clear();
            cin.ignore(1000, '\n');
            choice = -1;
        }
        switch (choice) {
        case 1:
            //listeleyelim//
            showStudents(students, 5);
            break;
        case 2:
            //arayalım//
            cout << "Aranacak ID: ";
            cin >> id;
            result = findStudent(students, 5, id);
            if (result != nullptr) {
                showStudent(result);
            }
            else {
                cout << "Ogrenci bulunamadi!" << endl;
            }
            break;
        case 3:
            //notu güncelleyelim//
            cout << "Guncellenecek ID: ";
            cin >> id;
            result = findStudent(students, 5, id);
            if (result != nullptr) {
                cout << "Yeni not: ";
                double newGrade;
                cin >> newGrade;
                updateGrade(result, newGrade);
                cout << "Not guncellendi!" << endl;
            }
            else {
                cout << "Ogrenci bulunamadi!" << endl;
            }
            break;
        case 4:
            //ortalama hesaplayalım//
            cout << "Sinif ortalamasi: " << calculateAverage(students, 5) << endl;
            break;
        case 0:
            cout << "Program sonlandiriliyor"<<endl;
            break;
        default:
            cout << "Gecerli olmayan secim" << endl;
        }
    } while (choice != 0);




}
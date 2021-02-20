import pandas as pd

def calculate_demographic_data(print_data=True):
    # Read data from file
    df = pd.read_csv("./Demographic Data Analyser/adult.data.csv", index_col=False, na_values=["no info", "."])

    # How many of each race are represented in this dataset? This should be a Pandas series with race names as the index labels.
    race_count = df["race"].value_counts()

    # What is the average age of men?
    condition1 = (df["sex"]=="Male")
    average_age_men = round(df.loc[condition1, "age"].mean(), 1)
    # What is the percentage of people who have a Bachelor's degree?
    condition2 = (df["education"]=="Bachelors")
    percentage_bachelors = round(len(df.loc[condition2].index) / len(df.index) * 100, 1)

    # What percentage of people with advanced education (`Bachelors`, `Masters`, or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?

    # with and without `Bachelors`, `Masters`, or `Doctorate`
    edulist = ["Bachelors", "Masters", "Doctorate"]
    condition3 = ((df["education"].isin(edulist)) & (df["salary"]==">50K"))
    condition4 = ((~df["education"].isin(edulist)) & (df["salary"]==">50K"))
    higher_education = len(df.loc[condition3].index)
    lower_education = len(df.loc[condition4].index)

    # percentage with salary >50K
    higher_education_rich = round(higher_education / len(df.loc[df["education"].isin(edulist)].index) * 100, 1)
    lower_education_rich = round(lower_education / len(df.loc[~df["education"].isin(edulist)].index) * 100, 1)

    # What is the minimum number of hours a person works per week (hours-per-week feature)?
    min_work_hours = df["hours-per-week"].min()

    # What percentage of the people who work the minimum number of hours per week have a salary of >50K?
    condition5 = (df["hours-per-week"]==min_work_hours)
    condition6 = (df["salary"]==">50K")
    num_min_workers = len(df.loc[condition5].index)

    rich_percentage = round(len(df.loc[condition5 & condition6].index) / len(df.loc[condition5].index) * 100, 1)

    # What country has the highest percentage of people that earn >50K?
    condition7 = df.loc[df["salary"]==">50K"]
    countries = df["native-country"].value_counts()
    richcountry = condition7["native-country"].value_counts()
    percent = richcountry/countries
    highest_earning_country = percent.sort_values(ascending=False).index[0]
    highest_earning_country_percentage = round(percent.sort_values(ascending=False)[0] * 100, 1)

    # Identify the most popular occupation for those who earn >50K in India.
    condition8 = df.loc[df["native-country"]=="India"]
    top_IN_occupation = condition8["occupation"].value_counts().index[0]

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count) 
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(f"Percentage with higher education that earn >50K: {higher_education_rich}%")
        print(f"Percentage without higher education that earn >50K: {lower_education_rich}%")
        print(f"Min work time: {min_work_hours} hours/week")
        print(f"Percentage of rich among those who work fewest hours: {rich_percentage}%")
        print("Country with highest percentage of rich:", highest_earning_country)
        print(f"Highest percentage of rich people in country: {highest_earning_country_percentage}%")
        print("Top occupations in India:", top_IN_occupation)

    return {
        'race_count': race_count,
        'average_age_men': average_age_men,
        'percentage_bachelors': percentage_bachelors,
        'higher_education_rich': higher_education_rich,
        'lower_education_rich': lower_education_rich,
        'min_work_hours': min_work_hours,
        'rich_percentage': rich_percentage,
        'highest_earning_country': highest_earning_country,
        'highest_earning_country_percentage':
        highest_earning_country_percentage,
        'top_IN_occupation': top_IN_occupation
    }

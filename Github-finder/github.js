class Github {
    constructor() {
        this.client_id = "1195d14d259be2160b69";
        this.client_secret = "788a2d5232ae70eac4dcf1a69fb55e512479eb8b";
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        
        return {
            profile, // profile : profile = profile
            repos
        }
    }
}
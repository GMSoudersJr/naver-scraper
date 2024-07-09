<script lang="ts">
  let searchText = $state("");
</script>

<div class="full-search-bar">
  <label class="recursive-600" for="search">
    Search Naver for:
  </label>
  <input
    class="recursive-600 input-search"
    id="search"
    name="searchNaverFor"
    type="search"
    bind:value={searchText}
  />
</div>

<style>
  .full-search-bar {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content);
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .input-search {
    width: 100%;
    padding: 12px 20px;
    margin: 0.5rem 0;
    box-sizing: border-box;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: var(--blueText);
    background-color: #d3d3d3;
  }
  label {
    font-size: 1.5rem;
    color: var(--brownText);
  }
</style>


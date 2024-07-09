<script lang="ts">
  export let link: string;
</script>


<li class="recursive-400 link-listitem">
  <a
    href={link}
    target="_blank"
    referrerpolicy="no-referrer"
  >
    {link}
  </a>
</li>

<style>
  .link-listitem:first-child {
    padding-top: 0.5rem;
  }
  .link-listitem > a {
    color: var(--blueText);
    word-wrap: break-word;
  }
  a:visited {
    color: var(--brownText);
    color: #6a453f;
  }
</style>

